import { base } from '../base';
import { queries } from '../queries';

export const defaultType = {
  fontFamily: 'system-ui, Segoe UI, Helvetica Neue, Arial',
};

const heading = {
  ...defaultType,
  fontWeight: 600,
  margin: 0,

  '& span': {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 'inherit',
    fontFamily: 'inherit',
  },
};

export const h1 = {
  ...heading,
  fontSize: base(4.522),
  lineHeight: base(4.522 * 1.10),

  [queries.md]: {
    fontSize: base(3.15),
    lineHeight: base(3.15 * 1.27),
  },
};

export const h2 = {
  ...heading,
  fontSize: base(3.15),
  lineHeight: base(3.15 * 1.27),

  [queries.md]: {
    fontSize: base(2.25),
    lineHeight: base(2.25 * 1.25),
  },
};

export const h3 = {
  ...heading,
  fontSize: base(2.25),
  lineHeight: base(2.25 * 1.25),

  [queries.md]: {
    fontSize: base(1.6),
    lineHeight: base(1.6 * 1.25),
  },
};

export const h4 = {
  ...heading,
  fontSize: base(1.6),
  lineHeight: base(1.6 * 1.25),
  fontWeight: 400,

  [queries.md]: {
    fontSize: base(1.15),
    lineHeight: base(1.15 * 1.25),
  },
};

export const h5 = {
  ...heading,
  fontSize: base(1.15),
  lineHeight: base(1.15 * 1.25),

  [queries.md]: {
    fontSize: base(1),
    lineHeight: base(1 * 1.25),
  },
};

export const body = {
  ...defaultType,
  fontSize: base(0.8),
  lineHeight: base(0.8 * 1.25),
};
