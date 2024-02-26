import { Prisma } from "@prisma/client";

const dogWithRelations = Prisma.validator<Prisma.DogDefaultArgs>()({
  include: { address: true, photos: true },
});

const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { favorites: true },
});

export type DogWithRelations = Prisma.DogGetPayload<typeof dogWithRelations>;
export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>

export type Age = "Baby" | "Young" | "Adult" | "Senior" | "";

export type DogParams = {
  where: {
    address?: {
      state?: State
      city?: string
      zipCode?: string
    }
    age?: Age
    breed?: string

  },
  include: {
    photos: true,
    address: true
  }

}

export type State =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY"
  | "";
