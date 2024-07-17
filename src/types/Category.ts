import { Links, Meta } from "./Generic";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
  sort?: string;
  order?: string;
  filter?: string;
  fields?: string;
  include?: string;
  exclude?: string;
  withTrashed?: boolean;
  withDeleted?: boolean;
}

export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  meta: Meta;
  links: Links;
  data: Category;
}

export interface CreateCategory {}
