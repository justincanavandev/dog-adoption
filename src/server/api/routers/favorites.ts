import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const favoriteDogsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        dogId: z.number()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("input", input);

        const favorites = await ctx.db.favoriteDogs.create({
          data: {
            userId: ctx.session.user.id,
            dogId: input.dogId
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
});
