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
  updateFavorites: protectedProcedure
    .input(
      z.object({
        dogIds: z.number().array(),
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
        const userId = ctx.session.user.id;
        if (!input.favorites) {
          const favorites = await ctx.db.favoriteDogs.create({
            data: { userId, dogIds: input.dogIds },
          });

          const updatedUser = await ctx.db.user.update({
            where: {
              id: userId,
            },
            data: {
              favorites: { connect: { userId } },
            },
            include: {
              favorites: true,
            },
          });
          if (favorites && updatedUser) {
            return favorites;
          } else {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "User unable to be updated",
            });
          }
        } else {
          const { dogIds } = input;

          const updatedFavorites = await ctx.db.favoriteDogs.update({
            where: {
              userId,
            },
            data: {
              dogIds,
            },
          });
          if (updatedFavorites) {
            return updatedFavorites;
          } else {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "User unable to be updated",
            });
          }
        }
      } catch (e) {
        console.error("There was an error updating the user!", e);
      }
    }),
  // removeFromFavorites: protectedProcedure
  //   .input(
  //     z.object({
  //       dogIds: z.number().array(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //       const { dogIds } = input;
  //       const userId = ctx.session.user.id;
  //       const updatedFavorites = await ctx.db.favoriteDogs.update({
  //         where: {
  //           userId,
  //         },
  //         data: {
  //           dogIds,
  //         },
          
  //       });
  //       if(!updatedFavorites) {
  //         throw new TRPCError({
  //           code: "BAD_REQUEST",
  //           message: "Favorite unable to be deleted",
  //         });
  //       }
  //     } catch (e) {}
  //   }),
});
