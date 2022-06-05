const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')

dotenv.config({path: './config/dev.env'})

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => {
    console.log("Database connection established")
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)// Date.now() + file.originalname
    }
})
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully")
    } catch (err) {
        console.log(err)
    }
})

// //to enable CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

app.get('/', (req, res) => {
    res.send("Welcome to home page")
})

app.get('/users', (req, res) => {
    res.send("Welcome to user page")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})