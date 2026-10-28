import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type Img = { src: string; alt: string };

function Column({ images, y, className }: { images: Img[]; y: MotionValue<string>; className?: string }) {
  return (
    <motion.div style={{ y }} className={cn("flex flex-col gap-3 will-change-transform", className)}>
      {images.map((im) => (
        <div key={im.src} className="overflow-hidden rounded-2xl bg-graphite-2">
          <img src={im.src} alt={im.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

/**
 * Three columns of images that slide past each other at different speeds
 * while the section scrolls through. Transform-only, so it stays smooth.
 */
export function ParallaxColumns({ images, children, className }: { images: Img[]; children?: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-18%", "6%"]);
  const c = useTransform(scrollYProgress, [0, 1], ["14%", "-30%"]);
  const third = Math.ceil(images.length / 3);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="grid h-[105svh] grid-cols-2 gap-3 px-3 md:grid-cols-3">
        <Column images={images.slice(0, third)} y={a} />
        <Column images={images.slice(third, third * 2)} y={b} className="-mt-24" />
        <Column images={images.slice(third * 2)} y={c} className="hidden md:flex" />
      </div>
      {children ? <div className="pointer-events-none absolute inset-0 grid place-items-center">{children}</div> : null}
    </div>
  );
}
