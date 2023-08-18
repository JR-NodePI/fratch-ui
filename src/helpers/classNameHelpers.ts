type CssClassNameItem = string | undefined | null;
type CssClassName = CssClassNameItem | CssClassNameItem[];
type CssClassNameParams = CssClassName[];

const getCssClasses = (classNames: CssClassName): string => {
  let classNameList: CssClassNameItem[] = [];

  if (classNames == null) return '';

  if (typeof classNames === 'string') {
    classNameList = classNames.split(/[\s]+/g);
  }

  if (Array.isArray(classNames)) {
    classNameList = classNames;
  }

  return classNameList
    .map(className => (className ?? '').trim())
    .filter(Boolean)
    .join(' ');
};

export const c = (...params: CssClassNameParams): string => {
  const classNamesList = params
    .map(param => getCssClasses(param))
    .filter(Boolean)
    .join(' ');

  return getCssClasses(classNamesList);
};
