import React from 'react';
import { Page } from '../../payload-types';
import { components } from '../../blocks';

type Props = {
  layout: Page['layout'];
  className?: string;
};

export const RenderBlocks: React.FC<Props> = ({ layout, className }) => (
  <div className={className}>
    {layout.map((block, i) => {
      // make blockType first character uppercase
      const blockType = `${
        block.blockType.charAt(0).toUpperCase() + block.blockType.slice(1)
      }Component`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Block: React.FC<any> = components[blockType];

      if (Block) {
        return (
          <section key={i}>
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);
