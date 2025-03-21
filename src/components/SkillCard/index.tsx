// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkillCard = (props: any) => {
  return (
    <div className="skill-card" data-title={props["data-title"]}>
      {props.children}
      {props.title && <p className="text-[1.8rem] opacity-80">{props.title}</p>}
    </div>
  );
};

export default SkillCard;
