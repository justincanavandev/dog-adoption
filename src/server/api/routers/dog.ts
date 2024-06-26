import { z } from "zod";
import { removeDuplicates } from "~/utils/helpers";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { DogParams } from "~/types/dog-types";
import { TRPCError } from "@trpc/server";

import { isAgeValid, isStateValid } from "~/utils/type-guards";
import { isZipCodeValid } from "~/utils/helpers";

export const dogRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
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
  getAllBreeds: publicProcedure.query(async ({ ctx }) => {
    try {
      const breeds = await ctx.db.dog.findMany({
        select: {
          breed: true,
        },
      });

      if (breeds) {
        const arrOfBreeds = breeds.map((breed) => breed.breed);
        const arrOfBreedsNoDups = removeDuplicates(arrOfBreeds);

        return arrOfBreedsNoDups;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Breeds unable to be fetched",
        });
      }
    } catch (e) {
      console.error("Breeds unable to be fetched!");
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
                address2: input.address.address2,
                city: input.address.city,
                zipCode: input.address.zipCode,
                state: input.address.state,
              },
            },
          },
        });
        return dogs;
      } catch (e) {
        console.error(e);
      }
    }),
  getAllSearch: publicProcedure
    .input(
      z.object({
        age: z.union([
          z.string().refine((age) => isAgeValid(age.trim()), {
            message: "String must match Age type",
          }),
          z.literal(""),
          z.literal("Age"),
        ]),
        state: z.union([
          z.string().refine((state) => isStateValid(state.trim()), {
            message: "String must be State type",
          }),
          z.literal(""),
          z.literal("State"),
        ]),
        city: z.string(),
        zipCode: z.union([
          z.string().refine((zip) => isZipCodeValid(zip.trim()), {
            message: "Zip Code must be formatted correctly",
          }),
          z.literal(""),
        ]),
        breed: z.string(),
        limit: z.union([z.number(), z.literal("Per Page")]),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      try {
        const params: DogParams = {
          take: limit === "Per Page" ? 6 : limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            breed: "asc",
          },
          where: {},
          include: {
            photos: true,
            address: true,
          },
        };
        const { where } = params;

        if (input.age.length > 0 && isAgeValid(input.age)) {
          where.age = input.age;
        }

        if (input.breed.length > 0) {
          where.breed = {
            contains: input.breed,
            mode: "insensitive",
          };
        }

        if (
          input.state.length > 0 ||
          input.city.length > 0 ||
          input.zipCode.length > 0
        ) {
          where.address = {};
        }

        if (input.city.length > 0 && where.address) {
          where.address.city = {
            contains: input.city,
            mode: "insensitive",
          };
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

        let nextCursor: typeof cursor | undefined = undefined;
        const limitOrPerPage = limit === "Per Page" ? 5 : limit

        if (dogs.length > limitOrPerPage) {
          const nextItem = dogs.pop();
          nextCursor = nextItem?.id;
        }

        let totalDogs;
        if (Object.keys(where).length !== 0) {
          const dogs = await ctx.db.dog.findMany({ where: where });
          totalDogs = dogs.length;
        } else {
          totalDogs = await ctx.db.dog.count();
        }

        return { dogs, nextCursor, totalDogs };
      } catch (e) {
        console.error("Unable to find dogs", e);
      }
    }),
  getOneById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const dog = await ctx.db.dog.findUnique({
          where: {
            id: id,
          },
          include: {
            photos: true,
            address: true,
          },
        });
        if (!dog) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dog unable to be fetched",
          });
        }
        return dog;
      } catch (e) {
        console.error("Unable to fetch dog", e);
      }
    }),
  getManyById: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.number()),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { ids } = input;
        const dogs = await ctx.db.dog.findMany({
          where: {
            id: {
              in: ids,
            },
          },
          include: {
            photos: true,
            address: true,
          },
        });

        if (!dogs) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dogs unable to be fetched",
          });
        }
        return dogs;
      } catch (e) {
        console.error("Unable to fetch dogs", e);
      }
    }),
});
