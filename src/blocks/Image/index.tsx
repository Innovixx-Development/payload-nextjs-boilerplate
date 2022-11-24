import React from 'react';
import NextImage from 'next/image';
import { RichText } from '../../components';
import styles from './index.module.css';
import { sizes } from './sizes';
import { Media } from '../../../payload-types';

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
    const selectedImageSize = type === 'normal' ? image.sizes.card : image.sizes.feature;

    const sizesToUse = sizes
      .map((size) => `(max-width: ${size}px) ${size}px`)
      .join(', ');

    return (
      <div className={`${styles.wrap} ${styles[type]}`}>
        <NextImage
          src={selectedImageSize.url}
          alt={image.alt}
          sizes={sizesToUse}
          width={selectedImageSize.width}
          height={selectedImageSize.height}
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
