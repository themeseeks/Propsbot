var soap = require('soap');
var WSSecurity = require('wsSecurity');

//var username='superuser@super';
//var password='Ut0@+%Xvcg0MrF54';

//var wsSecurity = new WSSecurity(username, password);    
//var url = 'https://i-0b467ededd45a2abb.workdaysuv.com/ccx/service/super/Talent/v28.0?wsdl';

var SoapFeedback = function Constructor(settings) {
    this.settings = settings;
    this.settings.username='superuser@super';
    this.settings.password='Ut0@+%Xvcg0MrF54';
    this.settings.url = 'https://i-0b467ededd45a2abb.workdaysuv.com/ccx/service/super/Talent/v28.0?wsdl';
    //this.feedbackXml = null;
    var wsSecurity = new WSSecurity(this.settings.username, this.settings.password); 


    this.feedbackXml = {"Give_Feedback_Data":{
   "From_Worker_Reference": {      
      "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21894"}
   },
   "To_Worker_Reference": {
       "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21021"}
   },
   "Comment": feedbackXml.Comment
}};
};   


SoapFeedback.SendFeedback = function (feedbackXml) {
    console.log(feedbackXml);
    soap.createClient(url, function(err, client) {
    client.setSecurity(wsSecurity);
    client.Give_Feedback(feedbackXml, function(err, result) {
        console.log(result);
    });
});
}; 

module.exports = SoapFeedback;