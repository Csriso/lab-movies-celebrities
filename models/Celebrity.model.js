const {Schema, model} = require("mongoose")

const celebritiesSchema = new Schema({
    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String
    }
})

const CelebritiesModel = model("celebrities", celebritiesSchema)

module.exports = CelebritiesModel;

