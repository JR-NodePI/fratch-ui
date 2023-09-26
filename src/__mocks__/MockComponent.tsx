const renderPropValue = (value: unknown): string => {
  switch (typeof value) {
    case 'function':
      return 'function () {}';
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean':
      return value.toLocaleString();
    default:
      return JSON.stringify(value);
  }
};

export default function MockComponent({
  __testDisplayName,
  children,
  ...restProps
}: {
  __testDisplayName?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}): JSX.Element {
  return (
    <>
      <code aria-label={`${__testDisplayName ?? ''} props`}>
        {Object.entries(restProps).map(
          ([key, value]) => `${key} : ${renderPropValue(value)}`
        )}
      </code>
      {children && (
        <code aria-label={`${__testDisplayName ?? ''} children`}>
          {children}
        </code>
      )}
    </>
  );
}
