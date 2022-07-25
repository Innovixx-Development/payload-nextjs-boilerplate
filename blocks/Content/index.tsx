import React from 'react';
import { Block } from 'payload/types';
import { RichText } from '../../components';
import styles from './index.module.css';

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
  ],
};

export const ContentComponent: React.FC<any> = (props) => {
  const { content } = props;

  return (
    <div className={styles.wrap}>
      <RichText
        content={content}
        className={styles.content}
      />
    </div>
  );
};
