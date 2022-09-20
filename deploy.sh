#! /bin/bash

while [[ $# -gt 1 ]]
  do
  key="$1" 
  case $key in
    --host)
    HOST="$2"
    shift
    ;;
    --user)
    USER="$2"
    shift
    ;;
    --port)
    PORT="$2"
    shift
    ;;
    --password)
    PASSWORD="$2"
    shift
    ;;
    --commit)
    COMMIT="$2"
    shift
    ;;
    *)
    ;;
  esac
  shift
done

if [ -z "$HOST" ] || [ -z "$USER" ] || [ -z "$PASSWORD" ]; then
  echo "Please provide --host --user --port --password"
  exit 1
fi

if [ -z "$PORT" ]; then
  PORT=22
fi

APP_DIR=/home/site/wwwroot
RELEASES_DIR=$APP_DIR/releases
STATIC_DIR=$APP_DIR/static
APP_ROOT=$APP_DIR/current
DEPLOYS_DIR=$APP_DIR/deploys
DATE_TIME=$(date +%Y%m%d%H%M%S)
RELEASE=$COMMIT'-'$DATE_TIME
RELEASE_DIR=$RELEASES_DIR/$RELEASE
DEPLOY_DIR=$DEPLOYS_DIR/$RELEASE
NODE_MODULES_DIR=$APP_DIR/node_modules

sshpass -p $PASSWORD ssh -p $PORT -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$HOST << EOF

echo "Checking if directories exists"
# check if releases directory exists
if [ ! -d "$RELEASES_DIR" ]; then
  echo "Creating releases directory"
  mkdir $RELEASES_DIR
fi

# check if deploys directory exists
if [ ! -d "$DEPLOYS_DIR" ]; then
  echo "Creating deploys directory"
  mkdir $DEPLOYS_DIR
fi

# check if static directory exists
if [ ! -d "$STATIC_DIR" ]; then
  echo "Creating static directory"
  mkdir $STATIC_DIR
fi

# check if deploy directory exists
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "Creating deploy directory"
  mkdir $DEPLOY_DIR
fi

# check if release directory exists
if [ ! -d "$RELEASE_DIR" ]; then
  echo "Creating release directory"
  mkdir $RELEASE_DIR
fi

# check if node modules directory exists
if [ ! -d "$NODE_MODULES_DIR" ]; then
  echo "Creating release directory"
  mkdir $NODE_MODULES_DIR
fi

exit
EOF

sshpass -p $PASSWORD  scp -P $PORT -r -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ./artifact.zip $USER@$HOST:$DEPLOY_DIR/artifact.zip

sshpass -p $PASSWORD ssh -p $PORT -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$HOST << EOF
echo "Unzipping artifact.zip"
unzip -o $DEPLOY_DIR/artifact.zip -d $RELEASE_DIR

cd $RELEASE_DIR

# link node_modules
echo "Linking node_modules"
ln -nfs $NODE_MODULES_DIR $RELEASE_DIR/node_modules

echo "Installing dependencies"
# install dependencies
yarn --production --frozen-lockfile --network-timeout 1000000000

# unlink node_modules
echo "Unlinking node_modules"
unlink $RELEASE_DIR/node_modules

# link release 
echo "Linking release"
ln -nfs $RELEASE_DIR $APP_ROOT

# link node_modules
echo "Link node_modules"
ln -nfs $NODE_MODULES_DIR $APP_ROOT/node_modules

# link static
echo "Linking static"
ln -nfs $RELEASE_DIR/static $STATIC_DIR

exit
EOF
