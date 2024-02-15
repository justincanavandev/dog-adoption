import { Prisma } from "@prisma/client";

const dogWithRelations = Prisma.validator<Prisma.DogDefaultArgs>()({
  include: { address: true, photos: true },
});

export type DogWithRelations = Prisma.DogGetPayload<typeof dogWithRelations>;

export type Age = "Baby" | "Young" | "Adult" | "";
