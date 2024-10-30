export interface IPostItem {
  id?: string
  rating?: number
  name: string
  description: string
  daily_value: number
  max_days: number
  min_days: number
  categories: string[]
};
export interface IPostImage {
  imagePaths: string[]
}
export interface IGetItemResponse {
  current_page: number;
  items: IGetItem[];
  per_page: number;
  total: number;
}

export interface IGetItem {
  id: string;
  images: {
    links: string[];
  };
  name: string;
  description: string;
  daily_value: number;
  max_days: number;
  min_days: number;
  updated_at: string;
}

