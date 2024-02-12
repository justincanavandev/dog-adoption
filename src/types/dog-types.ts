import type { Photo, Address } from "@prisma/client";

export type Dog = {
  name: string;
  age: string;
  breed: string;
  gender: string;
  id: number;
  photos: Photo[];
  address: Address;
};


