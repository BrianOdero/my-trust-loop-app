import createContextHook from '@nkzw/create-context-hook';
import { useCallback, useMemo, useState } from 'react';

interface SidePanelContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

export const [SidePanelProvider, useSidePanel] = createContextHook<SidePanelContextType>(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPanel = useCallback(() => {
    console.log('Opening side panel');
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    console.log('Closing side panel');
    setIsOpen(false);
  }, []);

  const togglePanel = useCallback(() => {
    console.log('Toggling side panel');
    setIsOpen(prev => !prev);
  }, []);

  return useMemo(() => ({
    isOpen,
    openPanel,
    closePanel,
    togglePanel,
  }), [isOpen, openPanel, closePanel, togglePanel]);
});