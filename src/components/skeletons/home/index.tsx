import Skeleton from "react-loading-skeleton";

const SkeletonHome = () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  return (
    <div className="max-w-[80%] m-auto flex flex-col gap-[15rem]">
      <div className="flex max-sm:flex-col-reverse gap-[22rem]">
        <div className="flex flex-col max-sm:max-w-[100%] justify-center gap-[6rem]">
          <Skeleton style={{ width: "570px", height: "40px" }} />
          <Skeleton style={{ width: isMobile ? "80%" : "692px", height: "40px" }} />
          <Skeleton style={{ width: isMobile ? "80%" : "692px", height: "162px" }} />
        </div>
        <div className="max-sm:max-w-[100%]">
          <Skeleton
            style={{ width: isMobile ? "80%" : "450px", height: isMobile ? "80%" : "450px" }}
            circle
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[5rem]">
        <Skeleton width={160} height={45} className="text-center" />
        <div className="flex gap-[2rem]">
          {Array(isMobile ? 1 : 3)
            .fill(0)
            .map((_, index) => {
              return <Skeleton key={index} height={516} borderRadius={45} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
