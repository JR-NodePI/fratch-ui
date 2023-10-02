export const isAscendantEvenTargetByID = (
  event: MouseEvent,
  id: string
): boolean => {
  const element = event.target as HTMLElement | null;
  const parent = element?.closest?.(`[id="${id}"]`);
  return parent?.id === id;
};
