import Skeleton from "react-loading-skeleton";

const SkeletonProjects = () => {
  return (
    <div className="projects-section">
      <div className="flex items-center justify-center mb-[7.5rem]">
        <Skeleton width={350} height={45} />
      </div>
      {Array(2)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="projects-list">
              <div>
                <Skeleton width={155} height={45} />
                <Skeleton width={110} height={4} />
              </div>
              <div>
                <Skeleton
                  count={3}
                  width={500}
                  height={270}
                  style={{ marginBottom: "3rem", marginRight: "5px" }}
                  inline
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonProjects;
