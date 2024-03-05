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
        dogIds: z.number().array(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id: input.userId,
          },
        });
        if (user) {
          const favorites = await ctx.db.favoriteDogs.create({
            data: { userId: ctx.session.user.id, dogIds: input.dogIds },
          });

          console.log("favorites", favorites);

          // return favorites;

          const updatedUser = await ctx.db.user.update({
            where: {
              id: user.id,
            },
            data: {
              favorites: { connect: { userId: favorites.userId } },
            },
            include: {
              favorites: true
            }
          });
          
          return updatedUser
        }
      } catch (e) {
        console.error(e);
      }
    }),
});
