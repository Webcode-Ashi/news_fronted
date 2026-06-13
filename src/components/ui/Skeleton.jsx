import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(clsx('animate-pulse rounded-none bg-border/40', className))}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const CompactCardSkeleton = () => (
  <div className="flex items-start gap-4 py-4">
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-3 w-1/3 mt-2" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full">
    <Skeleton className="w-full md:w-3/5 h-64 md:h-96" />
    <div className="w-full md:w-2/5 space-y-4 flex flex-col justify-center">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-4/5" />
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

export default Skeleton;
