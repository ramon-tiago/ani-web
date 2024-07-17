import { ResultGeneric, ResultsGeneric } from "./Generic";

export interface CastMembers {
  id: string;
  name: string;
  type: number;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface CastMembersParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
  sort?: string;
  order?: string;
  filter?: string;
  fields?: string;
  include?: string;
  exclude?: string;
  withTrashed?: boolean;
  withDeleted?: boolean;
}

export type ResultsCast = ResultsGeneric<CastMembers>;
export type ResultCast = ResultGeneric<CastMembers>;
