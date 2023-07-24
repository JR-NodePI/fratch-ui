type CssClassName = string | undefined | (string | undefined)[];
type CssClassNameParams = CssClassName[];

const getCssClasses = (classNames: CssClassName): string => {
  let classNameList: (string | undefined)[] = [];

  if (typeof classNames === 'string') {
    classNameList = classNames.split(' ');
  }

  if (Array.isArray(classNames)) {
    classNameList = classNames;
  }

  return classNameList
    .map(className => (className ?? '').trim())
    .filter(Boolean)
    .join(' ');
};

export const c = (...params: CssClassNameParams): string =>
  params
    .filter(Boolean)
    .map(param => getCssClasses(param))
    .join(' ');
