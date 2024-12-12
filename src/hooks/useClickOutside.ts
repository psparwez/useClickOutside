import { useEffect, useRef, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  events: ('mousedown' | 'mouseup' | 'touchstart' | 'touchend')[] = ['mousedown', 'touchstart']
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    events.forEach(event => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, events]);

  return ref;
}

export { useClickOutside }

