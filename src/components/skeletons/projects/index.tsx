import Skeleton from "react-loading-skeleton";

const SkeletonProjects = () => {
  return (
    <Skeleton
      count={3}
      width={500}
      height={270}
      style={{ marginBottom: "3rem", marginRight: "5px" }}
      inline
    />
  );
};

export default SkeletonProjects;
