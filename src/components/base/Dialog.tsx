type DialogProps = {
  title: string;
  Component: React.JSX.Element;
};

const Dialog = ({ title, Component }: DialogProps) => {
  return (
    
    <div className="rounded-md border border-black relative flex flex-col items-center ">
      <h2 className="sticky top-0 text-center mt-2 text-[1.7rem] max-w-[70%]">{title}</h2>
      <div className="my-4 flex max-h-[600px] flex-col items-center overflow-y-scroll rounded-md">
        {Component}
        <>
          <form className="" method="dialog">
            <div className="absolute right-3 top-0">
              <button className="btn cursor-pointer rounded-md text-[1.5rem]">
                x
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default Dialog;
