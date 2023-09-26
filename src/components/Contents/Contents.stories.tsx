import { createElement, Fragment, HTMLAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import styles from './Contents.module.css';

const contentTags = [
  { tag: 'h1', title: 'H1' },
  { tag: 'h2', title: 'H2' },
  { tag: 'h3', title: 'H3' },
  { tag: 'h4', title: 'H4' },
  { tag: 'p', title: 'Paragraph' },
  { tag: 'label', title: 'label' },
  { tag: 'a', title: 'link', attrs: { href: '#' } },
  { tag: 'strong', title: 'bold' },
  { tag: 'i', title: 'italic' },
];

function Contents({ content = '' }: { content: string }): JSX.Element {
  return (
    <>
      {contentTags.map(({ tag, title, attrs }, index) => (
        <Fragment key={index}>
          <span className={styles.miniTitle}>{title}</span>
          <div className={styles.wrapper}>
            {createElement(
              tag,
              (attrs ?? {}) as HTMLAttributes<unknown>,
              content
            )}
          </div>
        </Fragment>
      ))}
    </>
  );
}

const meta = {
  title: 'Components/Contents',
  component: Contents,
  argTypes: {},
} satisfies Meta<typeof Contents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Contents: Story = {
  args: { content: 'Hello World!' },
};
