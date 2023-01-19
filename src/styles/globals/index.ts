import { createUseStyles } from 'react-jss';
import { spacing } from '../sizes';
import { body, h1, h2, h3, h4, h5 } from '../types';

export const globalStyles = createUseStyles({
  '@global': {
    'html, body, #__next': {
      margin: 0,
      padding: 0,
      '-webkit-font-smoothing': 'antialiased',
      scrollBehavior: 'smooth',
      height: '100%',
    },
    h1,
    h2,
    h3,
    h4,
    h5,
    div: {
      fontWeight: 300,
    },
    p: {
      ...body,
      margin: `0 0 ${spacing.small} 0`,
      fontWeight: 300,
    },
    span: {
      ...body,
    },
    a: {
      ...body,
    },
    ol: {
      padding: `0 0 0 ${spacing.small}`,
      margin: `0 0 ${spacing.small} 0`,
    },
    ul: {
      padding: `0 0 0 ${spacing.small}`,
      margin: `0 0 ${spacing.small} 0`,

      listStyleType: 'square',
    },
    li: {
      ...body,
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});
