const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require("./routes/celebrities.routes.js");
router.use("/celebrities/", celebritiesRoutes);

const moviesRoutes = require("./routes/movies.routes");
router.use("/movies/", moviesRoutes);

module.exports = router;
