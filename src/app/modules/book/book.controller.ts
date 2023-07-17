import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { BookFiltersField } from "./book.constant";
import { paginationField } from "../../../constant/pagination";
import { createBookService } from "./book.service";
import { IGenericPagination } from "../../interfaceError/common";
import { IBook } from "./book.interface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...BookData } = req.body;
  const result = await createBookService.createBook(BookData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Created Success",

    data: result,
  });
});
const getSingaleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await createBookService.getSingaleBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Retirieved Success",

    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await createBookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Delete Success",

    data: result,
  });
});

const createPagination = catchAsync(async (req: Request, res: Response) => {
  // const paginationOption = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // }
  const filters = pick(req.query, BookFiltersField);
  const paginationOption = pick(req.query, paginationField);
  // console.log(paginationOption)
  const result = await createBookService.createPagination(
    filters,
    paginationOption
  );
  sendResponse<IGenericPagination<IBook[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Retirieved Success",
    meta: result.meta,
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log(updateData);
  const result = await createBookService.UpdateBook(id, updateData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Update Success",

    data: result,
  });
});

export const createBookController = {
  createPagination,
  updateBook,
  createBook,
  deleteBook,
  getSingaleBook,
};
