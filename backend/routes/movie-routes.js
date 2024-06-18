import express from "express"
import { addmovie, getAllMovies, getMovieById } from "../controllers/movie-controller.js";
const movieRouter = express.Router();

movieRouter.post("/",addmovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id",getMovieById);

export default movieRouter;