const express = require('express');
const Gifts = require('../models/giftsSchema')
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

router.post('/gifts',  async (req, res) =>{
    const gift = Gifts({
        giftname: req.body.giftname,
        giftball: req.body.giftball,
        aboutgift: req.body.aboutgift,
        image: req.body.image,
        adderId: req.body.adderId,
        adderSchool: req.body.adderSchool  
    });
    
    const result = await gift.save();
    if (result) {
        console.log("Muvaffaqiyatli saqlandi");
        res.send(result)
    } else {
        console.log("Saqlash jarayonoda hatolik");
    }
  
});


router.get('/gifts/:id',async (req, res) =>{
    const gift = await Gifts.find({_id: req.params.id})
    if(gift.length !== 0){
        res.status(200).send(gift) 
    }
    else{
        res.status(404).send("Bunday sovg'a yo'q")
    }
})


router.put('/gifts/:id', async (req, res) => {
    try {
        const gift = await Gifts.findByIdAndUpdate(
            req.params.id, 
            { ...req.body },
            { new: true }
        );
        if (gift) {
            res.status(200).send(gift);
        } else {
            res.status(404).send("Yangilashda hatolik");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Serverda xatolik yuz berdi");
    }
});

router.get('/gifts',async (req, res) =>{
    const data = await Gifts.find()
    if(data.length !== 0){
        res.status(200).send(data) 
    
    }
    else{
        res.status(404).send("Hatolik yuz berdi")
    }
})



router.delete('/gifts/:id', async (req, res) =>{
    const gift = await Gifts.findByIdAndDelete(req.params.id);
    if(gift){
        res.status(200).send(gift)
    }
    else{
        res.status(404).send("Bunday sovg'a  mavjud emas")
    }

});


module.exports =  router;


