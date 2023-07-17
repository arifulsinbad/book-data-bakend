export type IBook = {
  email: string;
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
