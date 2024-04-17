export class TrainingRequest {
  title: string;
  description: string;
  image: string;
}

export class TrainingResponse {
  id: number;
  title: string;
  description: string;
  image: string;
}

export class SearchTrainingRequest {
  title?: string;
  description?: string;
  image?: string;
  page: number;
  size: number;
}
