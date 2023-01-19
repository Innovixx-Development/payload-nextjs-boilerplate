import React from 'react';
import { RichText } from '../../components';

interface Props {
  content?: {
    [k: string]: unknown;
  }[];
}

export const ContentComponent: React.FC<Props> = ({ content }) => (
  <div>
    <RichText
      content={content}
    />
  </div>
);
