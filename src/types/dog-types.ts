import { Prisma } from "@prisma/client";

const dogWithRelations = Prisma.validator<Prisma.DogDefaultArgs>()({
  include: { address: true, photos: true },
});

export type DogWithRelations = Prisma.DogGetPayload<typeof dogWithRelations>;

export type Age = "Baby" | "Young" | "Adult" | "Senior" | "";

export type DogParams = {
  where: {
    // state?: State
    address?: {
      state?: State
    }
    age?: Age

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
