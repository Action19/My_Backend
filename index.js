const express = require('express');
require('./service/connectdb')();
const cors = require('cors');
const studentRoutes = require('./routes/studentsRoute');
const usersRoutes = require('./routes/usersRoutes'); 
const gradeRoutes = require('./routes/gradeRoutes');
const scienceRoutes = require('./routes/scienceRoutes');
const teacherRoutes = require('./routes/teachersRoute');
const ratingsRoutes = require('./routes/ratingRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const giftRoutes = require('./routes/giftsRoute');

const allowedOrigins = [
    "https://simulate-94cp0c8wv-simulate-team.vercel.app",
    "http://localhost:5173" // Agar lokalda test qilsangiz
  ];
  

const app = express();
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("Bloklangan CORS so‘rovi:", origin);
                callback(new Error("CORS bloklandi"));
            }
        },
        credentials: true,
    })
);
require('./startup/prod')(app);

app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: "2mb"}));
app.use(usersRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(gradeRoutes);
app.use(scienceRoutes);
app.use(schoolRoutes);
app.use(ratingsRoutes);
app.use(giftRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log( PORT + ' port eshitilmoqda');
})