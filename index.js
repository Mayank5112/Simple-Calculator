const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const Stack = require('stack-lifo');
const Logic = require('./Modules/Logic')
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { value: 0 });
});

app.post("/", (req, res) => {
    var value = req.body.value;
    const answer = Logic.answer(value);
    res.render("home", { value: answer });
})

app.listen(process.env.PORT || port, () => { console.log(`running on port ${port}`); })
