// This JavaScript file allows for the functionality of the contact form

// Firebase has already been initialised in mailing-list.js

var contactDB = firebase.database().ref("contact");

function showErrorMessage(message) {
  contactError = document.getElementById("contact-error");
  contactError.style.display = "block";
  contactError.innerHTML = "<strong>Oops! </strong>" + message;
}

// Function to validate an email
var validateEmail = function(email) {
  var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // RegEx from emailregex.com
  return emailPattern.test(email);
};

document.getElementById("contact-submit").addEventListener("click", function(event) {
  
  event.preventDefault(); // Prevent page reload upon submitting
  
  firstName = document.getElementById("first-name-input").value;
  lastName = document.getElementById("last-name-input").value;
  email = document.getElementById("contact-email-input").value;
  natureOfQuery = document.getElementById("dropdown").value;
  message = document.getElementById("message-input").value;

  // No first name given
  if (firstName == "") {
    showErrorMessage("Please enter your first name.");
  }

  // No email given
  else if (email == "") {
    showErrorMessage("Please enter your email.");
  }

  // Email is not valid
  else if (validateEmail(email) == false) {
    showErrorMessage("Please check your email and try again.");
  }

  // Empty message
  else if (message == "") {
    showErrorMessage("Please enter your message.");
  }

  // Success
  else {
    document.getElementById("contact-error").style.display = "none";
    document.getElementById("contact-form").style.display = "none";
    document.getElementById("contact-success").style.display = "block";

    contactDB.push( {
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
      "natureOfQuery" : natureOfQuery,
      "message" : message
    });
  }

});