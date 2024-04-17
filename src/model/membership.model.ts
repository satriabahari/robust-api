export class MembershipRequest {
  title: string;
  description: string;
  price: number;
}

export class MembershipResponse {
  id: number;
  title: string;
  description: string;
  price: number;
}

export class SearchMembershipRequest {
  title?: string;
  description?: string;
  price?: number;
  page: number;
  size: number;
}
