export const hasClosestElement = (
  event: MouseEvent,
  closestElementId: string
): boolean => {
  const element = event.target as HTMLElement | null;
  const parent = element?.closest?.(`[id="${closestElementId}"]`);
  return parent?.id === closestElementId;
};
