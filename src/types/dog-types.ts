import { Prisma } from "@prisma/client";
import type { InfiniteData } from "@tanstack/react-query";
import type { TRPCErrorShape } from "@trpc/server/rpc";
import type { TRPCClientErrorLike } from "@trpc/client";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

const dogWithRelations = Prisma.validator<Prisma.DogDefaultArgs>()({
  include: { address: true, photos: true },
});

const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { favorites: true },
});

export type DogWithRelations = Prisma.DogGetPayload<typeof dogWithRelations>;
export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>;

export type Age = "Baby" | "Young" | "Adult" | "Senior" | "";

type CapsFiltering = {
  contains: string
  mode: "insensitive"

}

export type DogParams = {
  take: number;
  cursor?: { id: number } | undefined;
  where: {
    address?: {
      state?: State;
      city?: CapsFiltering
      zipCode?: string;
    };
    age?: Age;
    breed?: string | CapsFiltering
  };
  include: {
    photos: true;
    address: true;
  };
};

export type SearchTerms = {
  limit: number | "Per Page"
  age: string;
  state: string;
  city: string;
  zipCode: string;
  breed: string
};

export type UpdatedDog = {
  dogId: number;
  action: string;
};

export type RefetchResult = QueryObserverResult<
  InfiniteData<
    | {
        dogs: DogWithRelations[];
        nextCursor: number | undefined;
        totalDogs: number;
      }
    | undefined
  >,
  TRPCClientErrorLike<TRPCErrorShape>
>;

export type RefetchDogs = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    InfiniteData<
      | {
          dogs: DogWithRelations[];
          nextCursor: number | undefined;
          totalDogs: number;
        }
      | undefined
    >,
    TRPCClientErrorLike<TRPCErrorShape>
  >
>;

export type PaginatedDogData = QueryObserverResult<
  InfiniteData<
    | {
        dogs: DogWithRelations;

        nextCursor: number | undefined;
        totalDogs: number;
      }
    | undefined
  >,
  TRPCClientErrorLike<TRPCErrorShape>
>;

export type DogData = InfiniteData<
  | {
      dogs: DogWithRelations[];
      nextCursor: number | undefined;
      totalDogs: number;
    }
  | undefined
>;

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
