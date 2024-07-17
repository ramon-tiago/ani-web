export interface Links {
  prev: null;
  last: string | null;
  next: string | null;
  first: string | null;
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

export interface ResultsGeneric<T> {
  meta: Meta;
  links: Links;
  data: T[];
}

export interface ResultGeneric<T> {
  meta: Meta;
  links: Links;
  data: T;
}
