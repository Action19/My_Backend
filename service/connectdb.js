const mongoose = require('mongoose');
module.exports =  function () {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb+srv://admin:<db_password>@19-maktab.3dnrvyu.mongodb.net/?retryWrites=true&w=majority&appName=19-maktab');
        console.log('Mongo connected');
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}


// S9xnnh1ILVJfhv5d
// mongodb+srv://admin:OHsemcB1mBK7fGjL@19-maktab.cyplx94.mongodb.net/?retryWrites=true&w=majority