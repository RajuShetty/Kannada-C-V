// Load modules

var gcm = require('node-gcm');

// Replace these with your own values.
var apiKey = "AAAAQrW83kY:APA91bEhcEnMAs3TfYYOBIrhbyNzUGiHXDQa94pkV-8Z-JtJTsRkdIOO3E3sFBpC7e2gRnKhCPilt_PkSQdk5PEsQg084nGa9nhsLiw4ACbx7Pe6Oux6IKCya0BY_eI_yrWdbOhrctHz";
var deviceID = "Device's Registration ID";

var service = new gcm.Sender(apiKey);
var message = new gcm.Message();
message.addData('title', 'Hello, World');
message.addData('body', 'This is a notification that will be displayed ASAP.');
message.addData('content-available', '1');

service.send(message, { registrationTokens: [ deviceID ] }, function (err, response) {
	if(err) console.error(err);
	else 	console.log(response);
});
