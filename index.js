const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars'); 
const logger = require('./middleware/logger');
const members = require('./Members');



const app = express();

//Body parser middleware
app.use(express.json());
//handle form data
app.use(express.urlencoded({extended:false}));

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//home page route using habdlebars
app.get('/', (req,res) => res.render('index', {
    title: 'Member App',
    members
}));


//int logger middleware
//app.use(logger);

/*
app.get('/', (req, res) => {
    //res.send('<h1>Hello World !!</h1>');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
});
*/



//set static folder for htmls
app.use(express.static(path.join(__dirname, 'public')));

//use express router - members API routes
app.use('/api/members', require('./routes/api/members'));
//check environment or just use 9000
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

