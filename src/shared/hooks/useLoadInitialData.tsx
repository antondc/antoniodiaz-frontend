import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { uiSwitchMounted } from 'Modules/Ui/actions/uiSwitchMounted';

type UseLoadInitialData = ({ loadInitialData }?: { loadInitialData?: () => Promise<void>; data?: unknown }) => void;

export const useLoadInitialData: UseLoadInitialData = ({
  loadInitialData = async () => new Promise((resolve) => resolve()),
} = {}) => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguage);

  const asyncLoadData = async () => {
    dispatch(uiSwitchMounted(false));
    await loadInitialData();
    dispatch(uiSwitchMounted(true));
  };

  useEffect(() => {
    asyncLoadData();
  }, [currentSlug]);
};
