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
    --commit)
    COMMIT="$2"
    shift
    ;;
    *)
    ;;
  esac
  shift
done

if [ -z "$HOST" ] || [ -z "$USER" ]; then
  echo "Please provide --host --user --port"
  exit 1
fi

if [ -z "$PORT" ]; then
  PORT=22
fi

APP_DIR=/var/www/payload-nextjs-boilerplate
RELEASES_DIR=$APP_DIR/releases
STATIC_DIR=$APP_DIR/storage
APP_ROOT=$APP_DIR/current
DEPLOYS_DIR=$APP_DIR/deploys
DATE_TIME=$(date +%Y%m%d%H%M%S)
RELEASE=$COMMIT'-'$DATE_TIME
RELEASE_DIR=$RELEASES_DIR/$RELEASE
DEPLOY_DIR=$DEPLOYS_DIR/$RELEASE

ssh -p $PORT -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$HOST << EOF

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

exit
EOF

scp -P $PORT -r -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ./artifact.zip $USER@$HOST:$DEPLOY_DIR/artifact.zip

ssh -p $PORT -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $USER@$HOST << EOF

source /home/azureuser/.nvm/nvm.sh

echo "Unzipping artifact.zip"
unzip -q -o $DEPLOY_DIR/artifact.zip -d $RELEASE_DIR

cd $RELEASE_DIR

# link release 
echo "Linking release"
ln -nfs $RELEASE_DIR $APP_ROOT

# link static
echo "Linking static"
ln -nfs $STATIC_DIR $APP_ROOT/storage

# purge old releases
echo "Purging old releases"
cd $RELEASES_DIR
ls -t | tail -n +4 | xargs rm -rf

# purge old deploys
echo "Purging old deploys"
cd $DEPLOYS_DIR
ls -t | tail -n +4 | xargs rm -rf

cd $APP_DIR
pm2 startOrReload app.json

exit
EOF
