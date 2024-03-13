// import { IoMdCloseCircle } from "react-icons/io";

type DialogProps = {
  title: string;
  Component: React.JSX.Element;
};

const Dialog = ({ title, Component }: DialogProps) => {
  return (
    <div className="rounded-md border border-black relative">
      <h2 className="sticky top-0 text-center text-[1.7rem]">{title}</h2>
      <div className="my-4 flex max-h-[600px] flex-col items-center overflow-y-scroll rounded-md">
        {Component}
        <>
          {/* <div className="modal-action"> */}
          <form className="absolute right-3 top-0" method="dialog">
            <div className="">
              <button className="btn cursor-pointer rounded-md text-[1.5rem]">
                x
              </button>
            </div>
          </form>
          {/* </div> */}
        </>
      </div>
    </div>
  );
};

export default Dialog;
