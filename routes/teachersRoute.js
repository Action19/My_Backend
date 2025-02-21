const express = require('express');
const Teachers = require('../models/teachersSchema');
const userName = require('../middleware/generateUser');
const router =express.Router(); 
const multer  = require('multer');
const path = require('path');
const generateJWTToken = require('../service/token')
// const cors = require('cors');



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

router.post('/teachers', userName,  async (req, res) =>{
    // const username = generateUsername(".", 5, 20, req.body.firstname + req.body.lastname);
    const teacher = new Teachers({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fathername: req.body.fathername,
        schoolname: req.body.schoolname,
        grades: req.body.grades,
        image: req.body.image,
        login: req.body.username,
        science: 'Informatika',
        password: '12345678',
        role: 'Teacher',
        
    });
    teacher.token = generateJWTToken(teacher._id, teacher.role, teacher.schoolname)
    const result = await teacher.save();
    if (result) {
        console.log("Muvaffaqiyatli saqlandi");
        res.send(result)
    } else {
        console.log("Saqlash jarayonoda hatolik");
    }
  
});


router.get('/teachers/:id',async (req, res) =>{
    const teacher = await Teachers.find({_id: req.params.id})
    if(teacher.length !== 0){
        res.status(200).send(teacher) 
    }
    else{
        res.status(404).send("Bunday o'qituvchi yo'q")
    }
})

// router.get('/teachers', async (req, res) =>{
//     const teacherLogin = await Teachers.find({login: req.body.login})
//     if(teacherLogin.length !== 0){
//         res.status(200).send(teacherLogin) 
//     }
//     else{
//         res.status(404).send([])
//     }
// })


router.put('/teachers/:id', async (req, res) => {
    try {
        const token = generateJWTToken(req.params.id, req.body.role, req.body.schoolname)
        const teacher = await Teachers.findByIdAndUpdate(
            req.params.id, 
            { ...req.body },
            { new: true }
        );
      
        teacher.token = token;
        const result = await teacher.save();
        if (result) {
            res.status(200).send(teacher);
        } else {
            res.status(404).send("Yangilashda hatolik");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

router.get('/teachers',async (req, res) =>{
    console.log(req.body);
    
    const data = await Teachers.find()
    
    if(data.length !== 0){
        res.status(200).send(data) 
           
        
    }
    else{
        res.status(404).send("Hatolik yuz berdi")
    }
})


router.delete('/teachers/:id', async (req, res) =>{
    const teacher = await Teachers.findByIdAndDelete(req.params.id);
    if(teacher){
        res.status(200).send(teacher)
    }
    else{
        res.status(404).send("Bunday o'qituvchi  mavjud emas")
    }

});


module.exports =  router;


