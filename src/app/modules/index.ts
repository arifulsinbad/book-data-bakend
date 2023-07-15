import express from "express";

const router = express.Router();

const routeMapper = [
  {
    path: "/users/",
    route: "fghf",
  },
  {
    path: "/cows/",
    route: "ghj",
  },
];

routeMapper.forEach((route) => router.use(route.path, route.route));

export default router;
