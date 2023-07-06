export const c = (classNames: string | string[]): string => {
  let classNameList: string[] = [];

  if (typeof classNames === "string") {
    classNameList = classNames.split(" ");
  }

  if (Array.isArray(classNames)) {
    classNameList = classNames;
  }

  return classNameList
    .map((className) => className.trim())
    .filter(Boolean)
    .join(" ");
};
