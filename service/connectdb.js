const mongoose = require('mongoose');
module.exports =  function () {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb://localhost:27017/');
        console.log('Mongo connected');
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}


// S9xnnh1ILVJfhv5d
// mongodb+srv://admin:OHsemcB1mBK7fGjL@19-maktab.cyplx94.mongodb.net/?retryWrites=true&w=majority