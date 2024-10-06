const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type NewsType = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  originalUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const getTopNewsApi = async (): Promise<NewsType[]> =>
  await fetch(`${BASE_URL}/news/recent`).then((res) => res.json());
