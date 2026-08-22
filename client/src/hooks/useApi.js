import { useCallback, useEffect, useRef, useState } from "react";

export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const result = await fetcher(controller.signal);
      if (!controller.signal.aborted) {
        setData(result);
        setLoading(false);
      }
      return result;
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err);
        setLoading(false);
      }
      throw err;
    }
  }, [fetcher]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setLoading(true);
    setError(null);
    fetcher(controller.signal)
      .then((result) => {
        if (active) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active && !controller.signal.aborted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData, setError, run };
}