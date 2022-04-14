import { useEffect, useState } from 'react';

import { isDomAvailable } from '@antoniodcorrea/utils';

type UseCachedData = <T>(data: T) => T;

export const useCachedData: UseCachedData = <T>(data) => {
  const [cachedData, setCachedData] = useState<T>();

  useEffect(() => {
    if (!data || !Object.keys(data || {}).length) return;

    setCachedData(data);
  }, [data]);

  // Skip on server side, as `cachedData` will be always undefined on first time
  if (!isDomAvailable) {
    return data;
  }

  return cachedData;
};
