export class MerchandiseRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
}

export class MerchandiseResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export class SearchMerchandiseRequest {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  page: number;
  size: number;
}
