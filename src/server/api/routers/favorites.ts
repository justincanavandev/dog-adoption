import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const favoriteDogsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        dogIds: z.number().array(),

      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log('ctx.session.user', ctx.session.user)
      try {
        const favorites = await ctx.db.favoriteDogs.create({
          data: {
            userId: ctx.session.user.id,
            dogIds: input.dogIds,
          },
        });
        if (!favorites) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Favorites unable to be created",
          });
        }
        console.log('favorites', favorites)
        console.log('ctx.session.user', ctx.session.user)
        return favorites;
      } catch (e) {
        console.error(e);
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        dogIds: z.number().array(),
        userId: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedDogs = await ctx.db.favoriteDogs.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            dogIds: input.dogIds,
            userId: input.userId
          },
        });

        if (!updatedDogs) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dogs unable to be updated",
          });
        }
        console.log('updatedDogs', updatedDogs)
        return updatedDogs;
      } catch (e) {
        console.error("Couldn't update Favorite Dogs");
      }
    }),
});
