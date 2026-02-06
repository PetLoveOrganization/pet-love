declare global {
  interface Array<T> {
    toSorted (comparator?: (a: T, b: T) => number): T[]
  }
}
type LoginParams = {
  email: string
  password: string
}

interface LoginResponse {
  user: User
}

interface User {
  id: string
  email: string
  name: string
}
interface PetsResponse {
  data: Pet[]
  total: number
  offset: number
  limit: number
}
export interface Filters {
  species: string[]
  age?: number
  gender?: string,
  sortBy: string,
  text: string,
}
export const initialState: FiltersType = {
  text: '',
  species: [],
  age: undefined,
  gender: undefined,
  sortBy: SortBy.LATEST,
}
export const PetAges: { [key: number]: number[] } = {
  0: [0, 1],
  1: [2, 3],
  2: [4, 7],
  3: [8, 12],
  4: [12, 99],
}

export enum QuickActions {
  ALL = 'all',
  URGENT = 'urgent',
  VACCINATED = 'vaccinated',
}
export enum SortBy {
  LATEST = 'latest',
  OLDEST = 'oldest',
}
export const Species = {
  dog: 'Dog',
  cat: 'Cat',
  rabbit: 'Rabbit',
  bird: 'Bird',
  other: 'Other',
}
export const Ages = {
  puppy: 'Puppy (0-1 year)',
  teen: 'Teen (1-3 years)',
  adult: 'Adult (3-8 years)',
  senior: 'Senior (8+ years)',
}
export interface Pets {
  pets_for_adoption: Pet[];
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  age_unit: AgeUnit;
  size: Size;
  color: string;
  gender: Gender;
  description: string;
  images: string[];
  is_urgent: boolean;
  is_friendly: boolean;
  is_trained: boolean;
  energy_level: EnergyLevel;
  is_vaccinated: boolean;
  is_neutered: boolean;
  location: string;
  created_at: string;
}

export enum AgeUnit {
  Months = 'months',
  Years = 'years',
}

export enum EnergyLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export enum Size {
  ExtraLarge = 'Extra Large',
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}
