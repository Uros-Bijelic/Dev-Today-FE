import { useSyncExternalStore } from 'react';

// ----------------------------------------------------------------

const emptySubscribe = () => () => {};

// Returns false during SSR and the first client render, true after
// hydration — avoids the hydration-mismatch/set-state-in-effect issues of
// the useState + useEffect(() => setIsMounted(true), []) pattern.
export const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
