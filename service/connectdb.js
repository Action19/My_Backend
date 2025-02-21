const mongoose = require('mongoose');
module.exports =  function () {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb+srv://admin:dYLGNwq2xu8W5F2W@19-maktab.3dnrvyu.mongodb.net/?retryWrites=true&w=majority&appName=19-maktab');
        console.log('Mongo connected');
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}


// dYLGNwq2xu8W5F2W
// mongodb+srv://admin:dYLGNwq2xu8W5F2W@19-maktab.3dnrvyu.mongodb.net/?retryWrites=true&w=majority&appName=19-maktab