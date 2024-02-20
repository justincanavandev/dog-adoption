import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
import type { DogParams } from "~/types/dog-types";

import { isAgeValid, isStateValid } from "~/utils/type-guards";
import { isZipCodeValid } from "~/utils/helpers";

export const dogRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const dogs = await ctx.db.dog.findMany({
        include: {
          photos: true,
          address: true,
        },
      });
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
  getAllSearch: protectedProcedure
    .input(
      z.object({
        age: z.union([
          z.string().refine((age) => isAgeValid(age.trim()), {
            message: "String must match Age type",
          }),
          z.literal(""),
        ]),
        state: z.union([
          z.string().refine((state) => isStateValid(state.trim()), {
            message: "String must be State type",
          }),
          z.literal(""),
        ]),
        city: z.string(),
        zipCode: z.union([
          z.string().refine((zip) => isZipCodeValid(zip.trim()), {
            message: "Zip Code must be formatted correctly",
          }),
          z.literal(""),
        ]),
        breed: z.string()
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        console.log("input", input);
        const params: DogParams = {
          where: {},
          include: {
            photos: true,
            address: true,
          },
        };
        const { where } = params;
        console.log("input", input);

        if (input.age.length > 0 && isAgeValid(input.age)) {
          where.age = input.age;
        }

        if (input.breed.length>0) {
          where.breed = input.breed
        }

        if (
          input.state.length > 0 ||
          input.city.length > 0 ||
          input.zipCode.length > 0
        ) {
          where.address = {};
        }

        if (input.city.length > 0 && where.address) {
          where.address.city = input.city;
        }

        if (
          input.state.length > 0 &&
          isStateValid(input.state) &&
          where.address
        ) {
          where.address.state = input.state;
        }

        if (input.zipCode.length > 0 && where.address) {
          where.address.zipCode = input.zipCode;
        }

        

        const dogs = await ctx.db.dog.findMany(params);
        return dogs;
      } catch (e) {
        console.error("Unable to find dogs", e);
      }
    }),
});
