const express = require ('express');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

app.use('/api', routes);

app.use('/public/images', express.static(__dirname + '/public/images'));

const listener = app.listen(process.env.PORT || 2887, () => {
    console.log('Your app is listening on port ' + listener.address().port);
})