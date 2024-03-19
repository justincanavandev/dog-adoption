import { signIn, signOut, useSession } from "next-auth/react";
import type { DogWithRelations } from "~/types/dog-types";
import type { MutableRefObject } from "react";
import { FaHeart } from "react-icons/fa";

type NavProps = {
  favoriteDogs: DogWithRelations[];
  favoriteDialogRef: MutableRefObject<HTMLDialogElement | null>;
};

const Nav = ({ favoriteDogs, favoriteDialogRef }: NavProps) => {
  const { data: sessionData } = useSession();
  return (
    <div className="fixed top-0 z-50 flex h-fit w-screen items-center justify-end gap-8 border-black border-opacity-[50%] border-b-[2px] py-2 bg-purple text-white">
      {favoriteDogs.length > 0 && (
        <FaHeart
          className="absolute left-3 top-2 z-50 cursor-pointer text-[1.6rem] text-red-400"
          onClick={() => favoriteDialogRef.current?.showModal()}
        ></FaHeart>
      )}
      <button
        className="mr-4 rounded-md px-1 transition text-[1.1rem] hover:cursor-pointer hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Nav;
