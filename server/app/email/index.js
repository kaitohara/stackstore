'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_key = 'XQQVNAJwFEXrRQNklfmoxQ';
var mandrill_client = new mandrill.Mandrill(mandrill_key);

var logo = 'http://localhost:1337/stackify-logo.png';
//
//var mongoose = require('mongoose');
//var Order = mongoose.model('Order');

var emailTypes = require('./types');

function sendEmail(emailType, params){

    params.push(logo);
    var swiggedOutEmail = emailTypes[emailType].apply(null, params);

    var async = false;
    var ip_pool = "Main Pool";

    //message must already be transformed
    mandrill_client.messages.send(
        {
            "message": swiggedOutEmail,
            "async": async,
            "ip_pool": ip_pool
        }, function(result) {
            console.log(swiggedOutEmail);
            console.log(result);
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });


};



//function sendEmail(emailType, params){
//
//    Order.findById('55bf86bed51acd7136114bed')
//        .exec()
//        .then(function(order){
//            var testOrder = order;
//            console.log('what is this order?', order);
//
//            var testOrderData = [
//                'test user',
//                'chulander@mail.com',
//                null,
//                'Order Confirmation',
//                'Thank you for your order',
//            ];
//
//            emailType='order';
//            console.log('params prior', params);
//            params=null;
//            params=testOrderData;
//            console.log('params post', params);
//            params.push(logo);
//            var orderDate = testOrder.date.finished;
//            testOrder.date = null;
//            testOrder.date = orderDate;
//
//
//            params.push(testOrder);
//            console.log('params post push', params);
//            //var swiggedOutEmail = emailTypes[emailType](
//            //    testOrderData[0],
//            //    testOrderData[1],
//            //    testOrderData[2],
//            //    testOrderData[3],
//            //    testOrderData[4],
//            //    logo,
//            //    testOrder
//            //
//            //);
//
//
//            var swiggedOutEmail = emailTypes[emailType].apply(null,params);
//            var async = false;
//            var ip_pool = "Main Pool";
//
//            //message must already be transformed
//            mandrill_client.messages.send(
//                {
//                    "message": swiggedOutEmail,
//                    "async": async,
//                    "ip_pool": ip_pool
//                }, function(result) {
//                    console.log(swiggedOutEmail);
//                    console.log(result);
//                }, function(e) {
//                    // Mandrill returns the error as an object with name and message keys
//                    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
//                    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
//                });
//        })
//        .then(null,function(err){
//            console.log('there is an error', err);
//        });
//
//
//
//};




module.exports = sendEmail;

