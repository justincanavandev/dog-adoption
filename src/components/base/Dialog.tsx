type DialogProps = {
  title: string;
  Component: React.JSX.Element;

};

const Dialog = ({ title, Component }: DialogProps) => {
  return (
    <div className="relative flex flex-col items-center  border-2 border-black">
      <h2 className="text-center text-[1.7rem]">{title}</h2>
      {Component}
      <>
        <form className="absolute right-2" method="dialog">
          <button className="btn hover:text-navy cursor-pointer rounded-md">
            Close
          </button>
        </form>
      </>
    </div>
  );
};

export default Dialog;
