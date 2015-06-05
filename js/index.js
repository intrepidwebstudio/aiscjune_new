/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var GOOGLE_PROJECT_ID = "";
var PUSHAPPS_APP_TOKEN = "929761a7-ce02-4b6d-90e8-ae0a83e556cf";
var UserDeviceId='';

/**
 * Register current device with PushApps
 */
 

 function onNotificationConfirm(button1){
	 			if(button1 == 2)
					{
					   $.mobile.changePage('#notification',{ transition:'slide' });
					   loadnotificationpage();
					}
	 }
	 
	 
	 
	 
 
function registerDevice() {
	PushNotification.registerDevice(GOOGLE_PROJECT_ID, PUSHAPPS_APP_TOKEN, function (pushToken) {
                              //      alert('registerDevice, push token' + pushToken);
																UserDeviceId=pushToken;
																//alert(UserDeviceId);
																savedeviceid(pushToken);
                                    }, function (error) {
                            //        alert('gggg='+error);
                                    });
	
	document.removeEventListener('pushapps.message-received');
	document.addEventListener('pushapps.message-received', function(event) {
                              var notification = event.notification;
                              var devicePlatform = device.platform;
                              if (devicePlatform === "iOS") {
                              //console.log('ss2');
                           
											navigator.notification.confirm(
											'New notification recieved',  // message
											onNotificationConfirm,
											'Notification',            // title
											'Read-later,view'          // buttonLabels
											);
											
							  //alert("message-received, Message: " + notification.aps.alert + " , D: " + notification.D);
							                                
							  } else {
								  
                             // alert("message-received, Message: " + notification.Message + " , Title: " + notification.Title + " , D: " + notification.D);
							  
                              }
                              });
							
    
}

/**
 * Unregister current device with PushApps
 */
function unregisterDevice() {
	document.removeEventListener('pushapps.message-received');
	PushNotification.unRegisterDevice(function () {
                                      alert("Your device was unregistered from PushApps");
                                      }, function () {
                                      console.log("error");
                                      alert("Error unregistering your device");
                                      });
}

/**
 * Send boolean tag
 */
function sendBooleanTag() {
	var d = document.getElementById('booleanTagInput').value === "on" ? "true" : "false";
	var iden = document.getElementById('booleanIdentifierTagInput').value;
    
    PushNotification.setTags([{
                              identifier: iden,
                              value: d
                              }], function () {
                             alert("Your tag was successfully added");
                             }, function (message) {
                             alert("ERROR: " + message);
                             });
}

/**
 * Send number tag
 */
function sendNumberTag() {
	var d = document.getElementById("numberTagInput").value;
	var iden = document.getElementById('numberIdentifierTagInput').value;
    
    PushNotification.setTags([{
                              identifier: iden,
                              value: d
                              }], function () {
                             alert("Your tag was successfully added");
                             }, function (message) {
                             alert("ERROR: " + message);
                             });
}

/**
 * Send string tag
 */
function sendStringTag() {
	var d = document.getElementById("stringTagInput").value;
	var iden = document.getElementById('stringIdentifierTagInput').value;
    
    PushNotification.setTags([{
                              identifier: iden,
                              value: d
                              }], function () {
                             alert("Your tag was successfully added");
                             }, function (message) {
                             alert("ERROR: " + message);
                             });
}

/**
 * Send date tag
 */
function sendDateTag() {
	var d = new Date(document.getElementById("dateTagInput").value);
    var n = d.toISOString();
    var iden = document.getElementById('dateIdentifierTagInput').value;
    
    PushNotification.setTags([{
                              identifier: iden,
                              value: n
                              }], function () {
                             alert("Your tag was successfully added");
                             }, function (message) {
                             alert("ERROR: " + message);
                             });
}

function removeTag() {
	var idens = [ document.getElementById('identifierRemoveTagInput').value ];
	PushNotification.removeTags(idens, function () {
                                alert("Tag removed successfully");
                                }, function (message) {
                                alert("ERROR: " + message);
                                });
}

function getDeviceId() {
    PushNotification.getDeviceId(function (deviceId) {
         //                        alert("Your device id is: " + deviceId);
							     }, function () {
                              //   alert("We could not get your device id. Please check your logs or contact our support team");
                                 })
}

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
		
		  if(navigator.network.connection.type != Connection.NONE){
			  
					document.addEventListener("resume", resumeappcallCB, false);
		  }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
         // StatusBar.backgroundColorByHexString("#1f1e2e");
		 callbanner();
		
   	   //  loadContactsFromLocalDb();
		$.mobile.page.prototype.options.domCache = true;
		$('#abc div.ui-checkbox label').removeClass('ui-btn');
		
		registerDevice();
            if(navigator.network.connection.type == Connection.NONE){
            //  callbanner(); 
			  loadNotificationsFromLocalDb();
			  loadEventsFromLocalDb();
			//  loadContactsFromLocalDb();
			  loadlinksFromLocalDb(); 
			  loadNewsletterFromLocalDb(); 
            }else{
           	//	callbannerfromserver();
				loadNotificationsfromserver();
				loadEventsfromserver();
			//	loadcontactsfromserver(); 
				loadlinksfromserver(); 
				//loadNewsletterfromserver();
				//console.log('connectin server');
				
				 
				
				var mapid1='<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d3096.390826458215!2d80.24626718779895!3d12.981671817928133!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6450872cd3%3A0xa9a3700f3f4b67b0!2sAmerican+International+School!5e1!3m2!1sen!2sin!4v1428489014895"  frameborder="0" style="border:0; width:100%;"></iframe>';
				//$('#mapid').html(mapid1);    
				
            }
			browser_setting();
			loadpassword();
			
			
			
	
     if(navigator.network.connection.type == Connection.NONE){

  //  navigator.notification.alert("Network problem , please try after sometime !!", alertCallback, "AISC", "OK");
	
	 }else{


	
	 }
    
	
			
			
			
			
			
			
			
	    }
};


function resumeappcallCB(){
			loadnotificationpage();
	}
	
/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pageinit", "#locateuss", function() {
    var defaultLatLng = new google.maps.LatLng(12.982186,80.246433);  // Default to Hollywood, CA when no geolocation support
        drawMap(defaultLatLng);  // No geolocation support, show default map
    function drawMap(latlng) {
		
        var myOptions = {
            zoom: 17,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});

function savedeviceid(deviceid){
	
	
	
	$.post(ajaxpath+'savedeviceid.php?AppTokenId='+AppTokenId+'&userdeviceid='+deviceid);
/*		var urlpath=ajaxpath+'savedeviceid.php?AppTokenId='+AppTokenId+'&userdeviceid='+deviceid;
	//console.log(urlpath);	
	$.support.cors = true;
	$.ajax({
	url:urlpath,
	type:'POST',
	contentType: "application/json",
	async: true,
	dataType: 'json',
	crossDomain: true,
	success: function(data)
	{},
error:function(){
		alert('error ');
		
		}
		})
	*/
	}