import { useEffect, useMemo, useState } from "react";

export default function useLoadOnce(fn: () => any, deps: any[]) {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const memoizedFn = useMemo(() => fn(), deps);

  useEffect(() => {
    if (isLoading) {
      setResult(memoizedFn);
      setIsLoading(false);
    }
  }, [memoizedFn, isLoading]);

  return { result, isLoading };
}
