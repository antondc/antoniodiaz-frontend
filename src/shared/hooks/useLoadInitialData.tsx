import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { uiSwitchMounted } from 'Modules/Ui/actions/uiSwitchMounted';
import { selectUiMounted } from 'Modules/Ui/selectors/selectUiMounted';

type UseLoadInitialData = ({ loadInitialData }?: { loadInitialData?: () => Promise<void>; data?: unknown }) => void;

export const useLoadInitialData: UseLoadInitialData = ({
  loadInitialData = async () => new Promise((resolve) => resolve()),
} = {}) => {
  const dispatch = useDispatch();
  const languagesLoading = useSelector(selectLanguageLoading);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const uiMounted = useSelector(selectUiMounted);

  // First mount, load data
  useLayoutEffect(() => {
    loadInitialData();
  }, []);

  // In case language start loading, update data
  useLayoutEffect(() => {
    if (!languagesLoading) return;

    setDataLoading(true);

    const asyncLoadData = async () => {
      await loadInitialData();
      setDataLoading(false);
    };

    asyncLoadData();
  }, [languagesLoading]);

  // In case language or data change, unmount and mount
  useLayoutEffect(() => {
    if ((languagesLoading || dataLoading) && uiMounted) {
      dispatch(uiSwitchMounted(false));

      return;
    }

    if (!languagesLoading && !dataLoading && !uiMounted) {
      dispatch(uiSwitchMounted(true));

      return;
    }
  }, [languagesLoading, dataLoading]);
};
