const express = require('express');
require('./service/connectdb')();
const cors = require('cors');
const studentRoutes = require('./routes/studentsRoute');
const usersRoutes = require('./routes/usersRoutes'); 
const gradeRoutes = require('./routes/gradeRoutes');


const app = express();
app.use(cors());

require('./startup/prod')(app);

app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: "2mb"}));
app.use(usersRoutes);
app.use(studentRoutes);
app.use(gradeRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log( PORT + ' port eshitilmoqda');
})