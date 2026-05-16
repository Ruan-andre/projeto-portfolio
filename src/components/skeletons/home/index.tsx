import Skeleton from "react-loading-skeleton";

const SkeletonHome = () => {
  return (
    <div className="home-container flex flex-col gap-32">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center gap-12 mt-20">
        <Skeleton circle width={280} height={280} />
        <Skeleton width={500} height={60} />
        <Skeleton width={300} height={40} />
        <Skeleton width={800} height={120} />
      </div>
      
      {/* Grid Skeleton */}
      <div className="flex flex-col gap-16">
        <Skeleton width={300} height={45} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} height={280} borderRadius={20} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
