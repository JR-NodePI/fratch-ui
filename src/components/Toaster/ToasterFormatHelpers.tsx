import { Fragment } from 'react';

export const tabToNodes = (message: string): JSX.Element[] => {
  const lines = message.split(/[\t]/g);
  return lines.map((line, index) => (
    <Fragment key={index}>
      {line}
      &nbsp;&nbsp;
    </Fragment>
  ));
};

export const nlToNodes = (message: string): JSX.Element[] => {
  const lines = message.split(/[\n\r]/g);
  return lines.map((line, index) => (
    <Fragment key={index}>
      {tabToNodes(line)}
      <br />
    </Fragment>
  ));
};
