function signinCallback(authResult) {
	alert("signin callback called");
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    document.getElementById("loginStatus").innerHTML = "asdf";
    alert("login_success");
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
	alert("login_error occured");
    console.log('Sign-in state: ' + authResult['error']);
  }
}