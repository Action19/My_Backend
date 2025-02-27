const express = require('express');
const Grades = require('../models/gradeSchema');
const router =express.Router(); 



router.post('/grades', async (req, res) =>{
    try {
        const grade = new Grades({
            gradename: req.body.gradename
        });
        if(grade){
            const saveGrade = await grade.save();
            res.status(200).send(saveGrade);
        } else {
            res.status(404).send("Sinf yaratishda hatolik");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Serverda xatolik yuz berdi"); 
    }

});

router.get('/grades', async (req, res) =>{
    try {
        const grade = await Grades.find();
        if(grade.length !== 0){
            res.status(200).send(grade);
        } else {
            res.status(404).send("Sinf ma'lumotlarini olib bo'lmadi");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Serverda xatolik yuz berdi"); 
    }

});

router.delete('/grades/:id', async (req, res) =>{
    const grade = await Grades.findByIdAndDelete(req.params.id);
    if(grade){
        res.status(200).send(grade)
    }
    else{
        res.status(404).send("Bunday o'quvchi  mavjud emas")
    }

});

module.exports =  router;