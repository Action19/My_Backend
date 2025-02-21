const express = require('express');
const Students = require('../models/studentsSchema');
const userName = require('../middleware/generateUser');
const router =express.Router(); 
const multer  = require('multer');
const generateJWTToken = require('../service/token')
const path = require('path');



const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./uploads");
        },
        filename: function(req, file, callback) {
            callback(null, file.filename + "-" + Date.now() + path.extname(file.originalname))
        }
    })
});

// upload.single('image')

router.post('/students', userName, async (req, res) =>{
    // const username = generateUsername(".", 5, 20, req.body.firstname + req.body.lastname);
    const student = new Students({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fathername: req.body.fathername,
        schoolname: req.body.schoolname,
        grade: req.body.grade,
        image: req.body.image,
        login: req.body.username,
        password: '12345678',
        role: 'Student',
    });
    student.token = generateJWTToken(student._id, student.role, student.schoolname)
    const result = await student.save();
    if (result) {
        console.log("Muvaffaqiyatli saqlandi");
        res.send(result)
    } else {
        console.log("Saqlash jarayonoda hatolik");
    }
  
});


router.get('/students/:id',async (req, res) =>{
    const student = await Students.find({_id: req.params.id})
    if(student.length !== 0){
        res.status(200).send(student) 
    }
    else{
        res.status(404).send("Bunday o'quvchi yo'q")
    }
})


router.put('/students/:id', async (req, res) => {
    try {
        const token = generateJWTToken(req.params.id, req.body.role, req.body.schoolname)
        const student = await Students.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, token: token },
            { new: true }
        );
        if (student) {
            res.status(200).send(student);
        } else {
            res.status(404).send("Yangilashda hatolik");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

router.get('/students',async (req, res) =>{
    const data = await Students.find()
    if(data.length !== 0){
        res.status(200).send(data) 
    
    }
    else{
        res.status(404).send("Hatolik yuz berdi")
    }
})



router.delete('/students/:id', async (req, res) =>{
    const student = await Students.findByIdAndDelete(req.params.id);
    if(student){
        res.status(200).send(student)
    }
    else{
        res.status(404).send("Bunday o'quvchi  mavjud emas")
    }

});


module.exports =  router;


