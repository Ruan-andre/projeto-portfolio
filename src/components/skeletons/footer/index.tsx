import Skeleton from "react-loading-skeleton";

const SkeletonFooter = () => {
  return (
    <>
      <div className="relative w-full mt-[10rem] top-[100%] flex flex-col gap-[5rem]">
        <div className="flex justify-center w-full">
          <Skeleton width={180} height={40} />
        </div>
        <Skeleton height={186} />
      </div>
      <div className="flex items-center justify-center mt-[2rem]">
        <Skeleton width={166} height={27} />
      </div>
    </>
  );
};

export default SkeletonFooter;
