declare global {
  interface Array<T> {
    toSorted (comparator?: (a: T, b: T) => number): T[]
  }
}
type LoginParams = {
  email: string
  password: string
}

type RegisterParams = LoginParams & {
  name: string
}

interface AuthResponse {
  user: User
}

interface User {
  id: string
  email: string
  name: string
  avatar?: string
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
  health?: PetHealth
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

export enum PetStates {
  ALL = 'all',
  URGENT = 'urgent',
  FRIENDLY = 'friendly',
  TRAINED = 'trained',
}

export enum PetHealth {
  VACCINATED = 'vaccinated',
  DEWORMED = 'dewormed',
  STERILIZED = 'sterilized',
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
  images: PetImage[];
  is_urgent: boolean;
  is_friendly: boolean;
  is_trained: boolean;
  energy_level: Level;
  affection_level: Level
  exercise_needs: Level
  is_vaccinated: boolean;
  vaccines?: string ;
  is_dewormed: boolean;
  dewormed_info?: string;
  is_sterilized: boolean;
  location: string;
  created_at: string;
  owner?: User;
  requirements: Requirement[];
  recovery_fee: number;
  user_context?: UserContext
}

export interface UserContext {
  has_applied: boolean;
  application_status: string;
  applied_at: string;
}

export interface Requirement {
  id?: string;
  icon_name: string;
  description: string;
}
export interface PetImage {
  image_url: string;
  is_primary: boolean;
}

export enum AgeUnit {
  Months = 'months',
  Years = 'years',
}

export enum Level {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  VeryHigh = 'very high',
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
