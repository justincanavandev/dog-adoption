import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const photosRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        full: z.string(),
        large: z.string(),
        medium: z.string(),
        small: z.string(),
        dogId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      try {
        const photos = await ctx.db.photo.create({
          data: {
            id: input.id,
            full: input.full,
            large: input.large,
            medium: input.medium,
            small: input.small,
            dogId: input.dogId,
          },
        });
        console.log("photos", photos);
        return photos;
      } catch (e) {
        console.error(e);
      }
    }),
});
