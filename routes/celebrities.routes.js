const router = require("express").Router();

const CelebritiesModel = require("../models/Celebrity.model.js")

router.get("/create", (req, res, next) => {

    res.render("celebrities/new-celebrity.hbs")

})

router.post("/create", (req, res, next) => {

    CelebritiesModel.create(req.body)

    .then((celebrity) => {
        res.redirect("/celebrities")
    })
    .catch((err) => {
        res.redirect("/create")
    }) 

})

module.exports = router;