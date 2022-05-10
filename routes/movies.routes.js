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

module.exports = router;
