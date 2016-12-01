var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
<<<<<<< HEAD
=======
var soap = require('soap');
var WSSecurity = require('wsSecurity');
var username='superuser@super';
var password='Ut0@+%Xvcg0MrF54';
var wsSecurity = new WSSecurity(username, password);    
var url = 'https://i-0b467ededd45a2abb.workdaysuv.com/ccx/service/super/Talent/v28.0?wsdl';


var args = function (comment) { 
    return {"Give_Feedback_Data":{
   "From_Worker_Reference": {      
      "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21894"}
   },
   "To_Worker_Reference": {
       "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21021"}
   },
   "Comment": comment
}};
}


var PropsBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'andre-test';

>>>>>>> bbdba5b6e1519f1b8e394ee966e2f3fc40f13b08
    this.user = null;
    this.db = null;
};

PropsBot.prototype.run = function () {
    PropsBot.super_.call(this, this.settings);
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

PropsBot.prototype._onStart = function () {
    this._loadBotUser();
};

PropsBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

PropsBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromPropsBot(message) && 
        this._isToPropsBot(message)
    ) {
        this._replyWithThankYou(message);
    }
};

PropsBot.prototype._isToPropsBot = function (message) {
    var regexPropsBotName = new RegExp("^<@" + this.user.id + "> ");
    console.log(regexPropsBotName);
    var result = regexPropsBotName.test(message.text);
    console.log(result);
    console.log(message.text);
    return result;
}

PropsBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

PropsBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

PropsBot.prototype._isFromPropsBot = function (message) {
    return message.user === this.user.id;
};

PropsBot.prototype._sendMessage = function (originalMessage, sendingUser) {
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
<<<<<<< HEAD
    self.postMessageToChannel(channel.name, "Thanks for being a great Workmate, " + sendingUser.real_name + " :smile:", {as_user: true});
=======

soap.createClient(url, function(err, client) {
      client.setSecurity(wsSecurity);
     client.Give_Feedback(args(originalMessage.text.substr(originalMessage.text.indexOf(" ") + 1)), function(err, result) {
         console.log(result);
     });
 });
>>>>>>> bbdba5b6e1519f1b8e394ee966e2f3fc40f13b08
};

PropsBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

PropsBot.prototype._replyWithThankYou = function (originalMessage) {
    var propsBot = this;
    this.getUsers().then(function(data) {
        var user = data.members.filter(function(item) {
                return item.id == originalMessage.user;
            })[0];
<<<<<<< HEAD
=======
        // console.log(user);
        propsBot._sendMessage(originalMessage, user);        
>>>>>>> bbdba5b6e1519f1b8e394ee966e2f3fc40f13b08
    });
}

util.inherits(PropsBot, Bot);

module.exports = PropsBot;