import { useSidePanel } from '@/contexts/sidepanelcontext';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import SidePanel from './sidePanel';

export default function SidePanelContainer() {
  const { isOpen } = useSidePanel();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    console.log('Side panel animation triggered:', isOpen);
    
    if (isOpen) {
      setShouldRender(true);
    }
    
    Animated.timing(animatedValue, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start((finished) => {
      if (finished && !isOpen) {
        setShouldRender(false);
      }
    });
  }, [isOpen, animatedValue]);

  if (!shouldRender) {
    return null;
  }

  return <SidePanel animatedValue={animatedValue} />;
}