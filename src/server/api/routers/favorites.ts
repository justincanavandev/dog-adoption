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
      try {
        console.log("input", input);

        const favorites = await ctx.db.favoriteDogs.create({
          data: {
            userId: ctx.session.user.id,
            dogIds: input.dogIds,
          },
        });
        if (!favorites) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dog unable to be created",
          });
        }

        console.log("favorites", favorites);
        return favorites;
      } catch (e) {
        console.error(e);
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        dogIds: z.number().array(),
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
          },
        });
        if (!updatedDogs) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dog unable to be updated",
          });
        }
        return updatedDogs;
      } catch (e) {
        console.error("Unable to update dog", e);
      }
    }),
});
