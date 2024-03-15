import { api } from "~/utils/api";
import Dogs from "~/components/dogs/Dogs";
import { useSession } from "next-auth/react";
import Nav from "~/components/base/Nav";
import type { MutableRefObject } from "react";
import { useRef } from "react";

const DogPage = () => {
  const { data: sessionData } = useSession();
  const favoriteDialogRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);

  const { data: currentUser } = api.user.getById.useQuery(
    { id: sessionData ? sessionData.user.id : "" },
    {
      enabled: !!sessionData,
      staleTime: 5000 * 60,
    },
  );

  const {
    data: favoriteDogs,
    isSuccess: isFavoritesSuccess,
    isLoading: isFavoritesLoading,
  } = api.dog.getManyById.useQuery(
    {
      ids: currentUser?.favorites ? currentUser.favorites.dogIds : [],
    },
    { enabled: !!sessionData && !!currentUser, staleTime: 5000 * 60 },
  );

  return (
    <>
      <Nav
        favoriteDogs={
          favoriteDogs && isFavoritesSuccess && !isFavoritesLoading
            ? favoriteDogs
            : []
        }
        favoriteDialogRef={favoriteDialogRef}
      />
      <Dogs
        favoriteDogs={
          favoriteDogs && isFavoritesSuccess && !isFavoritesLoading
            ? favoriteDogs
            : []
        }
        sessionData={sessionData}
        currentUser={currentUser}
        favoriteDialogRef={favoriteDialogRef}
      />
    </>
  );
};

export default DogPage;
