import React from 'react';
import { serializeLexical } from './serialize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content?.root?.children) {
    return null;
  }

  return <div className={className}>{serializeLexical({ nodes: content?.root?.children })}</div>;
};
