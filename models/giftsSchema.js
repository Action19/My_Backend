const mongoose =  require('mongoose');

const giftsSchema = new mongoose.Schema({
    giftname: {type: String, required: true},
    giftball: {type: String, required: true},
    aboutgift: {type: String, required: true},
    image: {type: String},
    adderId: {type: String}, 
    adderSchool: {type: String}, 
}, {timestamps: true, });


const Gifts = mongoose.model("Gifts", giftsSchema);

module.exports =  Gifts