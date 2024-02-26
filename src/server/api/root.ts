import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { dogRouter } from "./routers/dog";
import { photosRouter } from "./routers/photo";
import { addressRouter } from "./routers/address";
import { favoriteDogsRouter } from "./routers/favorites";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  dog: dogRouter,
  photos: photosRouter,
  address: addressRouter,
  favorites: favoriteDogsRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
