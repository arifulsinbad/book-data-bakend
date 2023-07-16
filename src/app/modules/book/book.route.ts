import express from "express";
import { createBookController } from "./book.controller";

const router = express.Router();

router.patch(
  "/:id",

  createBookController.updateBook
);
router.get("/", createBookController.createPagination);

export const bookRoute = router;
