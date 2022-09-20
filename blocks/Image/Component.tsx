import React from 'react';
import NextImage from 'next/image';
import { RichText } from '../../components';
import styles from './index.module.css';
import { sizes } from './sizes';
import { Media } from '../../payload-types';

interface Props {
  image: string | Media;
  type?: 'normal' | 'fullscreen' | 'wide';
  caption?: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'image';
}

export const ImageComponent: React.FC<Props> = ({
  image,
  type = 'normal',
  caption,
}) => {
  if (typeof image === 'object') {
    let filenameToRender = image.filename;
    let { width } = image;
    let { height } = image;

    if (image.sizes[type]) {
      filenameToRender = image.sizes[type];
      width = image.sizes[type].width;
      height = image.sizes[type].height;
    }

    const sizesToUse = sizes
      .map((size) => `(max-width: ${size}px) ${size}px`)
      .join(', ');

    return (
      <div className={`${styles.wrap} ${styles[type]}`}>
        <NextImage
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filenameToRender}`}
          alt={image.alt}
          sizes={sizesToUse}
          width={width}
          height={height}
        />
        {caption && (
        <RichText
          className={styles.caption}
          content={caption}
        />
        )}
      </div>
    );
  }

  return null;
};
