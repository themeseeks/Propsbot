var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var soap = require('soap');
var WSSecurity = require('wssecurity');
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
   "Comment": comment,
   "Show_Name":true 
}};
}

var PropsBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'propsbot';
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
        !this._isFromPropsBot(message)
    ) {
        this._divideMessage(message);
    }
};

PropsBot.prototype._divideMessage = function (message) {
    var regexMessage = new RegExp(/^<(@[a-zA-Z1-9]*)>\s<@([^\s]*)>\s((?:.*\n*)*)$/);
    var divided = regexMessage.exec(message.text);
    if (divided != null && this._isPropsBot(divided[1])) {
        var toUser = divided[2];
        var messageText = divided[3];
        this._replyWithThankYou(message, toUser, messageText);
    }
}

PropsBot.prototype._isPropsBot = function (user) {
    var regexPropsBotName = new RegExp("^@" + this.user.id + "$");
    var result = regexPropsBotName.test(user);
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

PropsBot.prototype._sendMessage = function (self, fromUser, originalMessage, toUser, extractedMessage) {
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, "Thanks for being a great Workmate, " + fromUser.real_name + " :smile:, you gave the following feedback to " + toUser.real_name + "\n>" + extractedMessage, {as_user: true});
    soap.createClient(url, function(err, client) {
    client.setSecurity(wsSecurity);
        client.Give_Feedback(args(originalMessage.text.substr(originalMessage.text.indexOf(" ") + 1)), function(err, result) {
            //  console.log(result);
        });
    });
};

PropsBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

PropsBot.prototype._getFromUserById = function (self, fromUserID, originalMessage, toUserID, extractedMessage) {
    this.getUsers().then(function(data) {
        var user = data.members.filter(function(item) {
                return item.id == fromUserID;
            })[0];
        self._getToUserById(self, user, originalMessage, toUserID, extractedMessage);
    });
}

PropsBot.prototype._getToUserById = function (self, fromUser, originalMessage, toUserID, extractedMessage) {
    this.getUsers().then(function(data) {
        var user = data.members.filter(function(item) {
                return item.id == toUserID;
            })[0];
        self._sendMessage(self, fromUser, originalMessage, user, extractedMessage);   
    });
}

PropsBot.prototype._replyWithThankYou = function (originalMessage, toUserID, extractedMessage) {
    var self = this;
    var callback = self._sendMessage;
    self._getFromUserById(self, originalMessage.user, originalMessage, toUserID, extractedMessage);
}

util.inherits(PropsBot, Bot);

module.exports = PropsBot;