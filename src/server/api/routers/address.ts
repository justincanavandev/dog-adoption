import type { Address } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const addressRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        address1: z.string().nullable(),
        address2: z.string().nullable(),
        city: z.string().nullable(),
        zipCode: z.string().nullable(),
        state: z.string().nullable(),
        dogId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { address1, address2, city, zipCode, state, dogId } = input;
        const address: Address = await ctx.db.address.create({
          data: {
            address1,
            address2,
            city,
            state,
            zipCode,
            dogId,
          },
        });
        console.log("address", address);
        return address;
      } catch (e) {
        console.error(e);
      }
    }),
});
