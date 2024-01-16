require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Paginator = require('paginate-mongoose');
const Contact = require('./models/Contact');

const app = express();
const port = 8000;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log('Connected to Mongo');
});

app.use(express.json());
app.use(cors());

app.get('/list/', async function (req, res, next) {
    try {
        const paginator = new Paginator(Contact);

        const contacts = await paginator.find({ source: 'imported' });

        res.json({
            success: true,
            contacts,
            pageData: paginator.pageData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});

app.listen(port, () => console.log('listening on port ' + port));
