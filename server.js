const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));

app.use('./routes');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialthoughtz', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
