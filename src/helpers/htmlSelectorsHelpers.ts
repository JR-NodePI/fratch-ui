export const isAscendantEvenTargetByID = (
  event: MouseEvent,
  id: string
): boolean => {
  let element = event.target as HTMLElement | null;

  while (element?.id !== id && element?.parentElement) {
    element = element.parentElement;
  }

  return element?.id === id;
};
