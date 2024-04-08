import { signIn, signOut, useSession } from "next-auth/react";
import type { DogWithRelations } from "~/types/dog-types";
import type { MutableRefObject } from "react";
import { FaHeart } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";

type NavProps = {
  favoriteDogs: DogWithRelations[];
  favoriteDialogRef: MutableRefObject<HTMLDialogElement | null>;
};

const Nav = ({ favoriteDogs, favoriteDialogRef }: NavProps) => {
  const { data: sessionData } = useSession();
  return (
    <div className="fixed top-0 z-50 flex h-fit w-screen items-center justify-between gap-8 border-b-[2px] border-black border-opacity-[50%] bg-purple py-2 text-[1.1rem] text-white">
      <div className="flex items-center gap-2">
        <span className="ml-3">{`JC's Dog Adoption`}</span>
        <GiSittingDog className="text-[1.6rem]" />
      </div>
      <div className="flex gap-2 items-center">
        {favoriteDogs.length > 0 && (
          <FaHeart
            className=" z-50 duration-200 hover:scale-110 cursor-pointer text-[1.6rem] text-red-400"
            onClick={() => favoriteDialogRef.current?.showModal()}
          ></FaHeart>
        )}
        <button
          className="mr-3 rounded-md px-1 transition hover:cursor-pointer hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Nav;
