import { vi } from 'vitest';

export default async function MockLodashDebounce(
  requireActual: <T = unknown>() => Promise<T>
): Promise<unknown> {
  type FN = () => void;
  const { default: debounce } = (await requireActual()) as {
    default: (fn: FN, delay: number) => FN;
  };
  return {
    default: vi.fn((fn: FN): FN => debounce(fn, 10)),
  };
}
