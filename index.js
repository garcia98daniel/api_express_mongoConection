const express = require('express');
const app = express();

const { config } = require('./config/index');
const friendsApi = require('./routes/friends.js');

// middleWare BODY PARSER
app.use(express.json());

friendsApi(app);


app.listen(config.port, function(){
    console.log(`Listenig http://localhost:${config.port}`);
});