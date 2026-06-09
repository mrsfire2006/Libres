export interface GetTopSellingsResponse {
  bookId: string;
  name: string;
  description?: string | null;
  authorName: string;
  rating: number;
  price: number;
}
