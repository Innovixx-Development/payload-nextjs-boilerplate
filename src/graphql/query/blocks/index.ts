import { MEDIA_FIELD } from '../fields';

export const CONTENT = `
  ... on Content {
    id
    content
    blockName
    blockType
  }
`;

export const IMAGE = `
  ... on Image {
    image {
      ${MEDIA_FIELD}
    }
    type
    caption
    id
    blockName
    blockType
  }
`;
