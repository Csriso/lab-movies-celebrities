const router = require("express").Router();

const CelebritiesModel = require("../models/Celebrity.model.js");

// CREATE VIEW
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// CREATE POST NEW CELEBRITY
router.post("/create", (req, res, next) => {
  CelebritiesModel.create(req.body)
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.redirect("/create");
    });
});

// VIEW ALL CELEBRITIES
router.get("/", (req, res, next) => {
  console.log("ENTRO");
  CelebritiesModel.find()
    .then((response) => {
      res.render("celebrities/celebrities.hbs", {
        celebrities: response,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
