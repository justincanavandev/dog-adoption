import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";

import { cuprum } from "~/styles/fonts";
import Layout from "~/components/layout/Layout";
// import { useQuery } from "@tanstack/react-query";
// import type { DogWithRelations } from "~/types/dog-types";
// import type { Photo } from "@prisma/client";
// import { useState, useEffect } from "react";
// import type { AuthOResponse } from "~/types/auth-types";
// import { AuthContext } from "~/context/APIAuthContext";
// import axios from "axios";
// import type { AxiosResponse } from "axios";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // const API_BASE_URL = "https://api.petfinder.com/v2";

  // useEffect(() => {
  //   const fetchAccessToken: () => Promise<void> = async () => {
  //     try {
  //       const res: AxiosResponse<AuthOResponse> =
  //         await axios.get("/api/oauth-token");
  //       const data: AuthOResponse = res.data;
  //       const { access_token } = data;
  //       setAccessToken(access_token);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   void fetchAccessToken();
  // }, []);

  // const [dogs, setDogs] = useState<DogWithRelations[]>([]);

  // const { data: animalQuery } = useQuery({
  //   queryKey: ["getAllDogs"],
  //   queryFn: () => getAllAnimals(accessToken, API_BASE_URL),
  //   enabled: !!accessToken,
  // });

  // const getAllAnimals = async (accessToken: string | null, baseUrl: string) => {
  //   if (accessToken === null) return;
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };
  //     const response = await axios.get(`${baseUrl}/animals?limit=100`, config);

  //     return response;
  //   } catch (e) {
  //     console.error(e);
  //     throw new Error();
  //   }
  // };

  // useEffect(() => {
  //   if (animalQuery) {
  //     // console.log("animalQuery", animalQuery);
  //     const filteredDogs: DogWithRelations[] = animalQuery.data.animals
  //       .filter(
  //         (animal) => animal.species === "Dog" && animal.photos.length > 0,
  //       )
  //       .map(
  //         (dog) =>
  //           (dog = {
  //             name: dog.name,
  //             age: dog.age,
  //             id: dog.id,
  //             breed: dog.breeds.primary,
  //             gender: dog.gender,
  //             photos: dog.photos.map((photo: Photo) => {
  //               return {
  //                 ...photo,
  //                 id: "ckgqha4yg0000i6lkb78sl27k",
  //                 dogId: dog.id,
  //               };
  //             }),
  //             address: {
  //               address1: dog.contact.address.address1,
  //               address2: dog.contact.address.address2,
  //               city: dog.contact.address.city,
  //               state: dog.contact.address.state,
  //               zipCode: dog.contact.address.postcode,
  //               dogId: dog.id,
  //             },
  //           }),
  //       );
  //     // console.log("filteredDogs", filteredDogs);
  //     setDogs(filteredDogs);
  //   }
  // }, [animalQuery]);
  // console.log("dogs", dogs);

  // const { mutate: addOneDog } = api.dog.createOne.useMutation({});

  // const addAllDogs = () => {
  //   dogs.map((dog: DogWithRelations) => addOneDog(dog));
  // };

  return (
    <SessionProvider session={session}>
      <Layout>
        {/* <AuthContext.Provider value={{ accessToken, API_BASE_URL }}> */}
          <main className={`${cuprum.className} bg-gray-300 min-h-screen`}>
            {/* <button onClick={() => addAllDogs()}>Add All Dogs</button> */}
            <Component {...pageProps} />
          </main>
          <Toaster position="top-center" />
        {/* </AuthContext.Provider> */}
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
