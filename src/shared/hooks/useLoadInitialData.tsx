import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiSwitchMounted } from 'Modules/Ui/actions/uiSwitchMounted';

type UseLoadInitialData = ({ loadInitialData }?: { loadInitialData?: () => Promise<void>; data?: unknown }) => void;

export const useLoadInitialData: UseLoadInitialData = ({
  loadInitialData = async () => new Promise((resolve) => resolve()),
} = {}) => {
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const asyncLoadData = async () => {
    if (!!loadingData) return;

    setLoadingData(true);
    // dispatch(uiSwitchMounted(false));
    await loadInitialData();
    // dispatch(uiSwitchMounted(true));
    setLoadingData(false);
  };

  const useAsyncLoadDataWithCallback = useCallback(() => asyncLoadData(), []);

  useEffect(() => {
    useAsyncLoadDataWithCallback();
  }, []);
};
