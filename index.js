const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute')
dotenv.config()
app.use(cors());

// mongoose.connect( 
//     'mongodb+srv://nhattruongniit:truong123@cluster0.xga7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true,
//         useFindAndModify: false
//       },
//     () => {
//         console.log('connect to DB')
//     }
// )
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const PORT = process.env.PORT || 3005

app.use(express.json({ extend:true}));
app.get('/', (_,res) => res.send('API running'));

app.use('/api/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server up and running localhost: ${PORT}`)
});
