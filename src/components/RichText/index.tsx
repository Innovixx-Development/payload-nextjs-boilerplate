import React from 'react';
import serialize from './serialize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content) {
    return null;
  }

  return <div className={className}>{serialize(content)}</div>;
};
