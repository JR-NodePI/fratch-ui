export function setStyleProperties(variables: Record<string, string>) {
  return (element: HTMLElement | null): void => {
    if (element?.style == null) return;

    Object.entries(variables).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });
  };
}
