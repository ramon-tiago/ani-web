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

export interface Links {
  prev: null;
  last: string | null;
  next: string | null;
  first: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Meta {
  to: string;
  from: string;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface CreateCategory {}

export interface CategoryParams {
  page?: number;
  per_page?: number;
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
