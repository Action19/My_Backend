const express = require('express');
const Students = require('../models/studentsSchema');
const router =express.Router(); 


router.put('/ratings/:id', async (req, res) => {
    try {
        const updateField = {};
        updateField["ratings." + 'informatika'] = req.body.rating;
        
        const student = await Students.findByIdAndUpdate(
            req.params.id, 
            { $push: updateField },
            { new: true }
        );
        

        const oldStudent = await Students.findById(req.params.id);
        if (!oldStudent) {
            return res.status(404).json({ message: "Student topilmadi" });
        }
        rating = student.ratings.get('informatika').reduce((i, j)=> i+j, 0)
        oldStudent.ratingsumm = rating;
        await oldStudent.save();

        const allGrade = await Students.find({schoolname: req.body.schoolname, grade: req.body.grade}).sort({ratingsumm: -1});
        for (let i = 0; i < allGrade.length; i++) {
            allGrade[i].placeGrade = i + 1;
            await allGrade[i].save(); 
        };
              
        const allSchool = await Students.find({schoolname: req.body.schoolname}).sort({ratingsumm: -1});
        for (let i = 0; i < allSchool.length; i++) {
            allSchool[i].placeSchool = i + 1;
            await allSchool[i].save(); 
        };
        
        
        const allDistrict = await Students.find().sort({ratingsumm: -1});
        for (let i = 0; i < allDistrict.length; i++) {
            allDistrict[i].placeDistrict = i + 1;
            await allDistrict[i].save(); 
        };




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



module.exports =  router;
