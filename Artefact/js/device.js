// This JavaScript file manages the communication between the website and Firebase

// Firebase has already been initialised in mailing-list.js

var websiteDatabase = firebase.database().ref("devices/1/website");
var deviceDatabase = firebase.database().ref("devices/1/device");

// Initialise the key variables
var deviceName;
var fanOn;
var autoOnTemp;
var temp;

// Ensure initial default values on website are consistent with Firebase
window.addEventListener('load', (event) => {
  websiteDatabase.on('value', (snapshot) => {

    autoOnTemp = snapshot.val().autoOnTemp;
    deviceName = snapshot.val().deviceName;
    fanOn = snapshot.val().fanOn;

    if (autoOnTemp != undefined) {
    document.getElementById("auto-on-input").value = autoOnTemp;
    }
    if (deviceName != undefined) {
      document.getElementById("device-name-label").innerHTML = deviceName;
    }
    if (fanOn == false) {
      $('#toggle-switch').prop('checked', false).change()
    }
  });
});

// Update the Firebase database with the data from the website
function postToFirebase() {
  websiteDatabase.set ({
    "deviceName" : deviceName,
    "fanOn" : fanOn,
    "autoOnTemp" : autoOnTemp
  });
}

// Continuously get the temperature from Firebase
const toggleSwitch = document.getElementById("toggle-switch");
var intervalID = setInterval(updateFromFirebase, 1000);
function updateFromFirebase() {
  deviceDatabase.on('value', (snapshot) => {
    temp = snapshot.val().temp;
  });
  if (temp != undefined) {
    document.getElementById("temp-label").innerHTML = "<strong>Temperature: </strong>" + temp + "°C";
  };

  // Only implement this feature if a value is given
  if (autoOnTemp != "") {
    // Automatically control the fan based on the given auto-on temperature
    // Disable the toggle switch to prevent interference 
    if (temp > autoOnTemp) {
      toggleSwitch.disabled = false;
      $('#toggle-switch').prop('checked', true).change();
      toggleSwitch.disabled = true;
    } else {
      toggleSwitch.disabled = false;
      $('#toggle-switch').prop('checked', false).change();
      toggleSwitch.disabled = true;
    }  
  } else {
    // Allow the user to manually control the switch if no value is given
    toggleSwitch.disabled = false;
  }
}

// Get the auto-on temperature from the input box once updated and post to Firebase
var autoOnInput = document.getElementById("auto-on-input");
window.onload = function() {
  autoOnInput.addEventListener("change", function() {
    autoOnTemp = autoOnInput.value;
    postToFirebase();
  });
}

// Get the toggle button status once updated and post to Firebase
$(function() {
  $('#toggle-switch').change(function() {
    fanOn = $(this).prop('checked');
    postToFirebase();
  })
})

// Prevents the user from entering a non-number when asked for temperature
function onlyNumberKey(event) {
  // Only ASCII character in the range of numbers allowed
  var ASCIICode = (event.which) ? event.which : event.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
}
autoOnInput.onkeypress = onlyNumberKey;