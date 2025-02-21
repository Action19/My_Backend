const mongoose =  require('mongoose');

const studentsSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    fathername: {type: String, required: true},
    schoolname:{type: String, required: true},
    grade: {type: String, required: true},
    image: {type: String},
    role: {type: String},
    login: {type: String, unique: true},
    password: {type: String},
    ratings: {
        type: Map,
        of: [Number]
    },
    ratingsumm: {type: Number}, 
    placeGrade: {type: Number}, 
    placeSchool: {type: Number},
    placeDistrict: {type: Number}, 
    token: {type: String},
}, {timestamps: true, });


const Students = mongoose.model("Students", studentsSchema);

module.exports =  Students