const renderPropValue = (value: any) => {
  switch (typeof value) {
    case 'function':
      return 'function () {}';
    case 'object':
      return JSON.stringify(value);
    default:
      return value;
  }
};

export default function MockComponent({
  __testDisplayName,
  children,
  ...restProps
}: any): JSX.Element {
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
