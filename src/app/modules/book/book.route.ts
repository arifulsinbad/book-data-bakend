import express from "express";
import { createBookController } from "./book.controller";

const router = express.Router();

router.post(
  "/create-book",

  createBookController.createBook
);
router.get(
  "/:id",

  createBookController.getSingaleBook
);
router.delete(
  "/:id",

  createBookController.deleteBook
);

router.patch(
  "/:id",

  createBookController.updateBook
);
router.get("/", createBookController.createPagination);

export const bookRoute = router;
