var mandrill = require('mandrill-api/mandrill');
var mandrill_key = require('../../keys/index.js').mandrill_key;
var mandrill_client = new mandrill.Mandrill(mandrill_key);

var path = require('path');
var emailPath = path.join(__dirname + '/views/signup.html');
var swig = require('swig');

var logo = 'http://localhost:1337/stackify-logo.png';

function sendEmail(to_name, to_email, tokenUrl, subject, topic, message //, from_name, from_email, subject, message
){
console.log('what is this token url?', tokenUrl);
var renderedEmail =  swig.renderFile(emailPath,
    {
        username : to_email,
        logo: logo,
        callbackUrl: tokenUrl,
        topic: topic,
        message: message
    }
);

    var message = {
        "html":  renderedEmail,
        "subject": subject,
        "from_email": 'chufinity@gmail.com',
        "from_name": 'admin',
        "to": [{
            "email": to_email,
            "name": to_name
        }],
    }
    var async = false;
    var ip_pool = "Main Pool";

    mandrill_client.messages.send(
    {
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
         console.log(message);
         console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};

module.exports = sendEmail;
