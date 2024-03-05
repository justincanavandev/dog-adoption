import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
        include: {
          favorites: true,
        },
      });
      console.log("user", user);
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User unable to be fetched",
        });
      }
      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        dogIds: z.number().array().optional(),
        userId: z.string().optional(),

        favorites: z
          .object({
            dogIds: z.number().array(),
            userId: z.string(),
          })
          .nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.favorites) {
          const favorites = await ctx.db.favoriteDogs.create({
            data: { userId: ctx.session.user.id, dogIds: input.dogIds },
          });

          console.log("create favorites", favorites);

          // return favorites;

          const updatedUser = await ctx.db.user.update({
            where: {
              id: input.userId,
            },
            data: {
              favorites: { connect: { userId: favorites.userId } },
            },
            include: {
              favorites: true,
            },
          });
          console.log('create updatedUser', updatedUser)
          return updatedUser;
        } else {
          const { userId } = input.favorites;
          const { dogIds } = input;


          const updatedFavorites = await ctx.db.favoriteDogs.update({
            where: {
              userId,
            },
            data: {
              dogIds: dogIds,
            },
          });
          return updatedFavorites;
        }
      } catch (e) {
        console.error(e);
      }
    }),
});
