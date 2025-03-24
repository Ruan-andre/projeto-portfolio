import Skeleton from "react-loading-skeleton";

const SkeletonHome = () => {
  return (
    <div className="max-w-[80%] m-auto flex flex-col gap-[15rem]">
      <div className="flex gap-[22rem]">
        <div className="flex flex-col justify-center gap-[6rem]">
          <Skeleton width={570} height={40} />
          <Skeleton width={692} height={40} />
          <Skeleton width={692} height={162} />
        </div>
        <Skeleton width={450} height={450} circle />
      </div>
      <div className="flex flex-col items-center gap-[5rem]">
        <Skeleton width={160} height={45} className="text-center" />
        <div className="flex gap-[2rem]">
          {Array(3)
            .fill(0)
            .map((_, index) => {
              return <Skeleton key={index} width={498} height={516} borderRadius={45} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
