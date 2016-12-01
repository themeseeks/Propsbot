'use strict';

var PropsBot = require('../lib/propsbot');

var token = process.env.BOT_API_KEY;
// var name = process.env.BOT_NAME;

var propsbot = new PropsBot({
    token: token,
    // name: name
});

propsbot.run();

