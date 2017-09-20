var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		var push = PushNotification.init({
	android: {
	},
	ios: {
		alert: "true",
		badge: "true",
		sound: "true"
	},
	windows: {}
});

push.on('registration', function(data) {
	console.log(data.registrationId);
	var deviceToken = data.registrationId;
	$.ajax({
        "url": "http://vineyardworkerschurch.org/?smpushcontrol=savetoken",
        "dataType": "json",
        "method": "POST",
        "data": {
            "device_token" : deviceToken,
            "device_type" : 'android'
        },
        "success": function(response) {
            console.log("Device ID "+deviceToken+" sent successfuly");
        }
    });
});

push.on('notification', function(data) {
	data.message,
	data.title,
	data.count,
	data.sound,
	data.image,
	data.additionalData
	console.log(data);
	alert(data.message);
});

push.on('error', function(e) {
	console.log(e.message);
});
		
push.on('error', function(e) {
	console.log("Error");
});
	
	push.on('notification', function(data) {
     console.log('notification event');
     var cards = document.getElementById("cards");
     var push = '<div class="card mdl-shadow--1dp">' +
       '<div class="card-content profile-image bg-3">' +
       '      <h1>' + data.title + '</h1>' +
       '      <span>' + data.message + '</span>' +
       '      <p>' + data.additionalData.foreground + '</p>' +
       '    </div>' +
       '</div>';
     cards.innerHTML += push;

     app.push.finish(function() {
         console.log('success');
     }, function() {
         console.log('error');
     });
 });	
		
 
 
        console.log('deviceready event');
        document.getElementById('regId').innerHTML = 'true';
    }
};
