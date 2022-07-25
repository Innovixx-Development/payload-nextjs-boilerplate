/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Block } from 'payload/types';
import { RichText } from '../../components';
import styles from './index.module.css';

type Data = Record<string, unknown>;

const customURLCondition = (_: Data, siblings: Data): boolean => siblings.type === 'custom';

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      minRows: 1,
      maxRows: 2,
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Button Label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'type',
              label: 'Button Type',
              required: true,
              type: 'radio',
              defaultValue: 'page',
              options: [
                {
                  label: 'Page',
                  value: 'page',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
              admin: {
                width: '50%',
                layout: 'horizontal',
              },
            },
          ],
        },
        {
          name: 'page',
          label: 'Page to link to',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (_: Data, siblings: Data): boolean => siblings.type === 'page',
          },
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          required: true,
          admin: {
            condition: customURLCondition,
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          required: true,
          admin: {
            condition: customURLCondition,
          },
        },
      ],
    },
  ],
};

export const CallToActionComponent: React.FC<any> = (props) => {
  const { content, buttons } = props;

  return (
    <div className={styles.cta}>
      <div className={styles.wrap}>
        <RichText
          content={content}
          className={styles.content}
        />
        {buttons && (
          <ul className={styles.buttons}>
            {buttons.map((button, i) => (
              <li key={i}>
                {button.type === 'page' && (
                  <Link
                    href="[...slug]"
                    as={`/${button.page.slug}`}
                  >
                    <a className={styles.button}>{button.label}</a>
                  </Link>
                )}
                {button.type === 'custom' && (
                  <a
                    className={styles.button}
                    href={button.url}
                    target={button.newTab ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {button.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
