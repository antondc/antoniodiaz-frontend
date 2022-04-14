import { useEffect, useState } from 'react';

type UseCachedData = <T>(data: T) => T;

export const useCachedData: UseCachedData = <T>(data) => {
  const [cachedData, setCachedData] = useState<T>();

  useEffect(() => {
    if (!data || !Object.keys(data || {}).length) return;

    setCachedData(data);
  }, [data]);

  return cachedData || data;
};
