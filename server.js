const express = require('express');
// const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialthoughtz', {
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// use this to log mongo queries being executed
// mongoose.set('debug', true);

// app.use(require('./routes'));

// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
