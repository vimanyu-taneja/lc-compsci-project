// This JavaScript file manages the validation check and saving of 
// the mailing list sign up form in the footer of a page

// Firebase initialisation
const firebaseConfig = {
  apiKey: "AIzaSyCzE6dV-a7R4oVT1B2gS43af404VYlTI4k",
  authDomain: "smartair-lccs.firebaseapp.com",
  databaseURL: "https://smartair-lccs-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smartair-lccs",
  storageBucket: "smartair-lccs.appspot.com",
  messagingSenderId: "895636089184",
  appId: "1:895636089184:web:35e99ea46203b6970b5605",
  measurementId: "G-DE8FV7517R"
};
firebase.initializeApp(firebaseConfig);
var mailingList = firebase.database().ref("mailing-list");

// Get key elements
submitButton = document.getElementById("newsletter-submit-btn");
emailInput = document.getElementById("email-input");
form = document.getElementById("newsletter-form");
formSuccess = document.getElementById("newsletter-submitted");
formError = document.getElementById("newsletter-error");

// Function to validate email format
var validateEmail = function(elementValue) {
  var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // RegEx from emailregex.com
  return emailPattern.test(elementValue);
};

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent page reload upon submitting
  email = emailInput.value;

  // If email is valid, display success message
  if (validateEmail(email)) {
    form.style.display = "none";
    formSuccess.style.display = "block";
    formError.style.setProperty("display", "none", "important")

    // Push email to Firebase
    mailingList.push(email);
    
  } else {
    
    // Otherwise display error message
    formError.style.display = "block";
  }
});