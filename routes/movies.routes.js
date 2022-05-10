const router = require("express").Router();

const MoviesModel = require("../models/Movie.model");
const CelebritiesModel = require("../models/Celebrity.model");

// CREATE GET
router.get("/create", (req, res, next) => {
  CelebritiesModel.find()
    .select("name")
    .then((celebrities) => {
      console.log(celebrities);
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

  MoviesModel.find().select("title")
  .then((response) => {
    res.render("movies/movies.hbs", {
      movies: response
    })
  }).catch((err) => {
    next(err)
  })
})

// GET "/movies/:id/"
router.get("/:id", (req, res, next) => {
  const {id} = req.params

  MoviesModel.findById(id).populate("cast")
  .then((response) => {
    res.render("movies/movie-details.hbs", {
      detailsMovie: response
    })
  }).catch((err) => {
    next(err)
  })
})



module.exports = router;
