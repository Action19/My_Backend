const mongoose =  require('mongoose')

const subjectSchema = new mongoose.Schema({
  subject: {type: [String]}
})

const teachersSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    fathername: {type: String, required: true},
    schoolname: {type: String, required: true},
    grades: {
        type: Array,
        of: [String],
      },
    image: {type: String},
    role: {type: String},
    login: {type: String, unique: true},
    password: {type: String},
    token: {type: String},
}, {timestamps: true, });


const Teachers = mongoose.model("Teachers", teachersSchema);

module.exports =  Teachers