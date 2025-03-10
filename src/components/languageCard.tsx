// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LanguageCard = (props: any) => {
  return (
    <div className="w-[15rem] h-[20rem] flex flex-col items-center justify-center gap-[3rem] p-[2rem] bg-gray-900 border-gray-900 rounded-[2rem] backdrop-blur-lg shadow-lg shadow-black/100 hover:bg-shadow-brown-red hover:scale-110 hover:transition-transform">
      {props.children}
      {props.title && <p className="text-[1.8rem] opacity-80">{props.title}</p>}
    </div>
  );
};

export default LanguageCard;
