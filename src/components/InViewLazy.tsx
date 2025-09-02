import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: number;
};

export default function InViewLazy({ children, rootMargin = "0px 0px -35% 0px", minHeight = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return; // already loaded
    const node = ref.current;
    if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, { root: null, rootMargin, threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  const style: React.CSSProperties = {
    ...(minHeight ? { minHeight } : {}),
    // Avoid heavy rendering work for offscreen content
    contentVisibility: 'auto' as any,
    containIntrinsicSize: minHeight ? undefined : '800px 600px' as any,
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
