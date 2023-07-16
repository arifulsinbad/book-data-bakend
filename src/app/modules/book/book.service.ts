import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helper/paginationHelper";
import { IGenericPagination } from "../../interfaceError/common";
import { IPagination } from "../../interfaceError/pagiation";
import { IBook, IBookFilter } from "./book.interface";
import Book from "./book.model";
import { BookSearchTermField } from "./book.constant";

const createPagination = async (
  filters: IBookFilter,
  paginationOption: IPagination
): Promise<IGenericPagination<IBook[]>> => {
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: BookSearchTermField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Book.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const UpdateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const createBookService = {
  createPagination,
  UpdateBook,
};
