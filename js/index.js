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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

        window.plugins.OneSignal.startInit( "d0aff88c-442d-44d5-b986-e98c32bd9513", "639924066309")
                                .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
                                .handleNotificationOpened(didOpenRemoteNotificationCallBack)
                                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
                                .iOSSettings(iosSettings)
                                .endInit();
    }
};

function didReceiveRemoteNotificationCallBack(jsonData) {
        alert("Notification received:\n" + JSON.stringify(jsonData));
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    }
function didOpenRemoteNotificationCallBack (jsonData) {
        alert("Notification opened:\n" + JSON.stringify(jsonData));
        console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));   
    }

function sendTag() {
    window.plugins.OneSignal.sendTag("PhoneGapKey", "PhoneGapValue");
}
function getIds() {
    window.plugins.OneSignal.getIds(function(ids) {
        document.getElementById("OneSignalUserId").innerHTML = "UserId: " + ids.userId;
        document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
        console.log('getIds: ' + JSON.stringify(ids));
    });
}

app.initialize();