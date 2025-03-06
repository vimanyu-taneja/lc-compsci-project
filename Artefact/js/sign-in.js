// This JavaScript file manages the sign-in functionality

// Firebase has already been initialised in mailing-list.js

var userDatabase = firebase.database().ref("users");

signInSuccess = document.getElementById("sign-in-success");
signInError = document.getElementById("sign-in-error");

document.getElementById("sign-in-submit").addEventListener('click', (event) => {

  event.preventDefault(); // Prevent page reload upon submitting
  
  userDatabase.on('value', (snapshot) => {

    username = document.getElementById("username-input").value;
    password = document.getElementById("password-input").value;

    var numOfUsers = snapshot.val().length - 1;

    var userFound = false;

    for (let i = 1; i < numOfUsers+1; i++) {
      console.log(snapshot.val()[i])

      currentUsername = snapshot.val()[i].username;
      currentPassword = snapshot.val()[i].password;

      console.log(currentUsername);
      console.log(currentPassword);

      console.log(username);
      console.log(password);

      if (currentUsername == username && currentPassword == password) {

        userFound = true;
        var userID = i;
      }
    }

    if (userFound == true) {
      signInSuccess.style.display = "block";
      signInError.style.setProperty("display", "none", "important");

      window.location.replace("my-account.html"); // Redirect to the control hub
    } else {
      signInError.style.display = "block";
      signInSuccess.style.setProperty("display", "none", "important");
    }

  });
});