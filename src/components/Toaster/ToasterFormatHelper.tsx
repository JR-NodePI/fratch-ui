export const tabToNodes = (message: string): JSX.Element[] => {
  const lines = message.split(/[\t]/g);
  return lines.map(line => (
    <>
      {line}
      &nbsp;&nbsp;
    </>
  ));
};

export const nlToNodes = (message: string): JSX.Element[] => {
  const lines = message.split(/[\n\r]/g);
  return lines.map(line => (
    <>
      {tabToNodes(line)}
      <br />
    </>
  ));
};
