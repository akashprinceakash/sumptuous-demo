import * as React from "react";
import { animate, useInView } from "motion/react";

/** Counts from zero to `value` the first time it enters the viewport. The HTML carries the real number. */
export function NumberTicker({ value, className }: { value: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  // pre-rendered markup shows the final figure; once the page is live it resets to 0 and counts up on view
  React.useEffect(() => { if (ref.current && !inView) ref.current.textContent = "0"; }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = Math.round(v).toLocaleString("en-IN"); },
    });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref} className={className}>{value.toLocaleString("en-IN")}</span>;
}
