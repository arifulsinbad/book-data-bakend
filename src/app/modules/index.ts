import express from "express";
import { bookRoute } from "./book/book.route";

const router = express.Router();

const routeMapper = [
  {
    path: "/books/",
    route: bookRoute,
  },
];

routeMapper.forEach((route) => router.use(route.path, route.route));

export default router;
