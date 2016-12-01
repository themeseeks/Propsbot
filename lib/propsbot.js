var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

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
        this._replyWithThankYou(message);
    }
};

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

// PropsBot.prototype._replyWithThankYou = function (originalMessage) {
//     var self = this;
//     var channel = self._getChannelById(originalMessage.channel);
//     var sendingUser = self._getUserById(originalMessage.user)
//     console.log("sending user" + sendingUser)
//     self.postMessageToChannel(channel.name, "sup " + sendingUser.real_name, {as_user: true});
// };

PropsBot.prototype._sendMessage = function (originalMessage, sendingUser) {
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    // var sendingUser = self._getUserById(originalMessage.user)
    console.log(sendingUser)
    self.postMessageToChannel(channel.name, "sup " + sendingUser.real_name, {as_user: true});
};

PropsBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

PropsBot.prototype._replyWithThankYou = function (originalMessage) {
    var propsBot = this;
    this.getUsers().then(function(data) {
        console.log("In function");
        var user = data.members.filter(function(item) {
                console.log("filtering");
                return item.id == originalMessage.user;
            })[0];
        // console.log(user);
        propsBot._sendMessage(originalMessage, user);
    });
}

util.inherits(PropsBot, Bot);

module.exports = PropsBot;