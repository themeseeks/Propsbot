/*
POST /ccx/service/super/Talent/v28.0 HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: ""
Content-Length: 1433
Host: i-0b467ededd45a2abb.workdaysuv.com
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)

<soapenv:Envelope xmlns:bsvc="urn:com.workday/bsvc" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header><wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-1"><wsse:Username>superuser@super</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">Ut0@+%Xvcg0MrF54</wsse:Password><wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">fStGACl6CZEOzFvLEBpLsg==</wsse:Nonce><wsu:Created>2016-12-01T17:07:01.739Z</wsu:Created></wsse:UsernameToken></wsse:Security>
     <bsvc:Workday_Common_Header>
     </bsvc:Workday_Common_Header>
  </soapenv:Header>
  <soapenv:Body>
       <bsvc:Give_Feedback_Request bsvc:version="v28.0">
       <bsvc:Give_Feedback_Data>
       <bsvc:From_Worker_Reference>
           <bsvc:ID bsvc:type="Employee_ID">21894</bsvc:ID>
       </bsvc:From_Worker_Reference>
       <bsvc:To_Worker_Reference>
           <bsvc:ID bsvc:type="Employee_ID">21021</bsvc:ID>
       </bsvc:To_Worker_Reference>
       <bsvc:Comment>YOU ARE MY HERO</bsvc:Comment>
       </bsvc:Give_Feedback_Data>
       </bsvc:Give_Feedback_Request>
   </soapenv:Body>
</soapenv:Envelope>
*/

var soap = require('soap');
var WSSecurity = require('wsSecurity');

var username='superuser@super';
var password='Ut0@+%Xvcg0MrF54';

  var wsSecurity = new WSSecurity(username, password)
  
  
var url = 'https://i-0b467ededd45a2abb.workdaysuv.com/ccx/service/super/Talent/v28.0?wsdl';
  //var args = {name: 'value'};

  var args = {"Give_Feedback_Data":{
   "From_Worker_Reference": {      
      "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21894"}
   },
   "To_Worker_Reference": {
       "ID": {"attributes": {"wd:type":"Employee_ID"}, $value: "21021"}
   },
   "Comment": "YOU ARE ALSO MY HERO says Node JS"
}};


  soap.createClient(url, function(err, client) {
       client.setSecurity(wsSecurity);
      client.Give_Feedback(args, function(err, result) {
          console.log(result);
      });
  });