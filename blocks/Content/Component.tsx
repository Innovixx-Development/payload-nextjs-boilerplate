import React from 'react';
import { RichText } from '../../components';
import styles from './index.module.css';

interface Props {
  content?: {
    [k: string]: unknown;
  }[];
}

export const ContentComponent: React.FC<Props> = ({ content }) => (
  <div className={styles.wrap}>
    <RichText
      content={content}
      className={styles.content}
    />
  </div>
);
