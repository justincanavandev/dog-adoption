import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

export const dogRouter = createTRPCRouter({
  createMany: protectedProcedure
    .input(
      z
        .object({
          id: z.number(),
          name: z.string().min(1),
          age: z.string().min(1),
          breed: z.string().min(1),
          gender: z.string().min(1),
          photo: z.string().nullable(),
        })
        .array(),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("input", input);
        const dogs = await ctx.db.dog.createMany({
          data: input,
        });
        console.log("dogs", dogs);
        return dogs;
      } catch (e) {
        console.error(e);
      }
    }),
});
