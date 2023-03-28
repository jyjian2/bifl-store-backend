const Brand = require('./models/brand')
const Product = require('./models/product')
const express = require('express')
const session = require('express-session')

const bodyParser = require('body-parser')

const db = require('./db');
const brandRouter = require('./routes/brand-router');
const productRouter = require('./routes/product-router');
const userRouter = require('./routes/user-router');

const cors = require('cors');
const req = require('express/lib/request');
const app = express();
const apiPort = 3001;


app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', brandRouter)
app.use('/api', productRouter)
app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server is running on ${apiPort}`));