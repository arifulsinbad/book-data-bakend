export type IBook = {
  image: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string;
};
export type IBookFilter = {
  searchTerm?: string;
};
