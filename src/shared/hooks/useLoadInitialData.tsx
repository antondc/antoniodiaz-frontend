import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { uiSwitchMounted } from 'Modules/Ui/actions/uiSwitchMounted';

type UseLoadInitialData = ({ loadInitialData }?: { loadInitialData?: () => Promise<void>; data?: unknown }) => void;

export const useLoadInitialData: UseLoadInitialData = ({
  loadInitialData = async () => new Promise((resolve) => resolve()),
} = {}) => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguage);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const asyncLoadData = async () => {
    if (!!loadingData) return;

    setLoadingData(true);
    dispatch(uiSwitchMounted(false));
    await loadInitialData();
    dispatch(uiSwitchMounted(true));
    setLoadingData(false);
  };

  const useAsyncLoadDataWithCallback = useCallback(() => asyncLoadData(), [currentSlug]);

  useEffect(() => {
    useAsyncLoadDataWithCallback();
  }, [currentSlug]);
};
