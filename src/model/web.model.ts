export class WebResponse<T> {
  data?: T;
  errors?: string;
  paging?: Paging;
}

export class Paging {
  current_page: number;
  size: number;
  total_page: number;
}
