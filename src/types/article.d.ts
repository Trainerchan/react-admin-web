export interface Article {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type ArticleForm = {
  id?: number;
  title: string;
  author: string;
  cover: string;
  content: string;
}

