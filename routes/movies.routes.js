const router = require("express").Router();

const MoviesModel = require("../models/Movie.model");
const CelebritiesModel = require("../models/Celebrity.model");

// CREATE GET
router.get("/create", (req, res, next) => {
  CelebritiesModel.find()
    .select("name")
    .then((celebrities) => {
      res.render("movies/new-movie.hbs", { celebrities });
    })
    .catch((err) => next(err));
});

// CREATE POST

router.post("/create", (req, res, next) => {
  MoviesModel.create(req.body)
    .then((response) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

// LIST GET
router.get("/", (req, res, next) => {
  MoviesModel.find()
    .select("title")
    .then((response) => {
      res.render("movies/movies.hbs", {
        movies: response,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// GET "/movies/:id/"
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  MoviesModel.findById(id)
    .populate("cast")
    .then((response) => {
      res.render("movies/movie-details.hbs", {
        detailsMovie: response,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// GET "/movies/:id/delete"
router.get("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  MoviesModel.findByIdAndDelete(id)
    .then((response) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

// GET "/movies/:id/edit"
router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const allCelebrities = await CelebritiesModel.find().select("name");
  MoviesModel.findById(id)
    .populate("cast")
    .then((response) => {
      console.log({ movie: response });
      res.render("movies/edit-movie.hbs", {
        movie: response,
        allCelebrities,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// POST "/movies/:id/edit"
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  MoviesModel.findByIdAndUpdate(id, req.body)
    .then((response) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
