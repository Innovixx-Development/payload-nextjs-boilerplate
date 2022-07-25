import React from 'react';
import classes from './index.module.css';
import { Page } from '../../payload-types';
import * as blocks from '../../blocks';

type Props = {
  layout: Page['layout'];
  className?: string;
};

export const RenderBlocks: React.FC<Props> = ({ layout, className }) => (
  <div className={[classes.renderBlocks, className].filter(Boolean).join(' ')}>
    {layout.map((block, i) => {
      // make blockType first character uppercase
      const blockType = `${
        block.blockType.charAt(0).toUpperCase() + block.blockType.slice(1)
      }Component`;
      const Block: React.FC<any> = blocks[blockType];

      if (Block) {
        return (
          <section
            key={i}
            className={classes.block}
          >
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);
