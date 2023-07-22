import React, { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import styles from './Texts.module.css';

function Texts({ content = '' }: { content: string }): JSX.Element {
  return (
    <>
      {[
        { tag: 'h1', title: 'H1' },
        { tag: 'h2', title: 'H2' },
        { tag: 'h3', title: 'H3' },
        { tag: 'h4', title: 'H4' },
        { tag: 'p', title: 'Paragraph' },
        { tag: 'label', title: 'label' },
        { tag: 'a', title: 'link', attrs: { href: '#' } },
        { tag: 'strong', title: 'bold' },
        { tag: 'i', title: 'italic' },
      ].map(({ tag, title, attrs }, index) => (
        <Fragment key={index}>
          <span className={styles.miniTitle}>{title}</span>
          <div className={styles.wrapper}>
            {React.createElement(tag, (attrs ?? {}) as any, content)}
          </div>
        </Fragment>
      ))}
    </>
  );
}

const meta = {
  title: 'Example/Texts',
  component: Texts,
  tags: [],
  argTypes: {},
} satisfies Meta<typeof Texts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 'Hello World!' },
};
