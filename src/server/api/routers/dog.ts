import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

export const dogRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const dogs = await ctx.db.dog.findMany({
        include: {
          photos: true,
          address: true,
        },
      });
      console.log("dogs", dogs);
      return dogs;
    } catch (e) {
      console.error("Dogs unable to be fetched", e);
    }
  }),
  createOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        age: z.string().min(1),
        breed: z.string().min(1),
        gender: z.string().min(1),
        photos: z
          .object({
            id: z.string().cuid(),
            full: z.string(),
            large: z.string(),
            medium: z.string(),
            small: z.string(),
            dogId: z.number(),
          })
          .array(),
        address: z.object({
          address1: z.string().nullable(),
          address2: z.string().nullable(),
          city: z.string().nullable(),
          zipCode: z.string().nullable(),
          state: z.string().nullable(),
          dogId: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // console.log("input", input);
        const dogs = await ctx.db.dog.create({
          data: {
            id: input.id,
            name: input.name,
            age: input.age,
            breed: input.breed,
            gender: input.gender,
            photos: {
              create: input.photos.map((photo) => ({
                full: photo.full,
                large: photo.large,
                medium: photo.medium,
                small: photo.small,
              })),
            },
            address: {
              create: {
                address1: input.address.address1,
                address2: input.address.address2,
                city: input.address.city,
                zipCode: input.address.zipCode,
                state: input.address.state,
              },
            },
          },
        });
        console.log("dogs", dogs);
        return dogs;
      } catch (e) {
        console.error(e);
      }
    }),
});
