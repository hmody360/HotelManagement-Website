function signup() {
  //preventDefault prevents the submit button from doing what it's supposed to do and do this func instead
  event.preventDefault();
  //registering inputs by the user to a variable
  var firstname = document.getElementById("fName").value;
  var lastname = document.getElementById("lName").value;
  var email = document.getElementById("Email").value;
  var username = document.getElementById("Username").value;
  var pass = document.getElementById("password").value;
  var repass = document.getElementById("Re-password").value;
  //registering the status element in var so we could change it later
  var status = document.getElementById("status");

  //creating the object a.k.a database to be inserted in localstorage
  var user = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: pass,
  };
  //validating (event listener are being used here)
  if (!checkRegister()) {
    status.style.color = "red";
    status.innerHTML = "Please fill the registeration form correctly.";
  } else {
    //storing values in the localstorage
    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    status.style.color = "green";
    status.innerHTML = "You have been registered successfully.";
    //after 2 secs redirec the user to the login
    setTimeout(function () {
      window.location.href = "login.html";
    }, 2000);
  }
}

function login() {
  //preventDefault prevents the submit button from doing what it's supposed to do and do this func instead
  event.preventDefault();
  //registering inputs by the user to a variable
  var username = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  //registering the status element in var so we could change it later
  var status = document.getElementById("status");

  var user = localStorage.getItem(username);
  data = JSON.parse(user);

  //validating (no need for event listener).
  //if user that doesnt exist in the localstorage then show this msg
  if (user == null) {
    status.style.color = "red";
    status.innerHTML = "Please enter a correct username.";
  } else if (username == data.username && pass == data.password) {
    sessionStorage.setItem("logged", user);
    status.style.color = "green";
    status.innerHTML = "You have been logged-in successfully. Redirecting...";
    //after 2 secs redirec the user to the homepage
    setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  } else {
    // if password is incorrect then show this msg
    status.style.color = "red";
    status.innerHTML = "Please enter a correct password.";
  }
}

function addApartment() {
  //preventDefault prevents the submit button from doing what it's supposed to do and do this func instead
  event.preventDefault();
  //registering inputs by the user to a variable
  var user = sessionStorage.getItem("logged");
  var data = JSON.parse(user);
  var username = data.username;

  var RoomNo = document.getElementById("RoomNo").value;
  var RoomType = document.getElementsByName("RoomType");
  if (RoomType[0].checked) {
    RoomType = RoomType[0].value;
  } else if (RoomType[1].checked) {
    RoomType = RoomType[1].value;
  } else {
    RoomType = null;
  }
  var RoomSize = document.getElementsByName("RoomSize");
  if (RoomSize[0].checked) {
    RoomSize = RoomSize[0].value;
  } else if (RoomSize[1].checked) {
    RoomSize = RoomSize[1].value;
  } else if (RoomSize[2].checked) {
    RoomSize = RoomSize[2].value;
  } else {
    RoomSize = null;
  }
  var Smoke = document.getElementById("Smoke");
  if (Smoke.checked) {
    Smoke = "Yes";
  } else {
    Smoke = "No";
  }
  //registering the status element in var so we could change it later
  var status = document.getElementById("status");
  //creating the object a.k.a database to be inserted in localstorage
  var apartment = {
    username: username,
    RoomNo: RoomNo,
    RoomType: RoomType,
    RoomSize: RoomSize,
    Smoke: Smoke,
  };
  //validating (no need for event listener)
  if (RoomType == null) {
    status.style.color = "red";
    status.innerHTML = "Please enter your room type.";
  } else if (RoomSize == null) {
    status.style.color = "red";
    status.innerHTML = "Please enter your room size.";
  } else if (checkAddApartment()) {
    //storing values in the localstorage
    var json = JSON.stringify(apartment);
    localStorage.setItem("apartments" + RoomNo, json);
    status.style.color = "green";
    status.innerHTML = "You have added an apartment successfully.";
  } else {
    status.style.color = "red";
    status.innerHTML = "Please fill the form correctly.";
  }
}

//if the user is in the regisertation page
if (document.URL.includes("register.html")) {
  //check inputs instantly
  checkRegister();
}
//if the user is in the add apartment page
if (document.URL.includes("addApartment.html")) {
  //check inputs instantly
  checkAddApartment();
}

function checkAddApartment() {
  //asigning variable
  let RoomNo = document.getElementById("RoomNo");
  function checkRoomNo() {
    let status = document.getElementById("status");
    if (RoomNo.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter a room number.";
    } else if (!isCorrect(RoomNo.value)) {
      status.style.color = "red";
      status.innerHTML = "Your room number is not in the correct form [1-999].";
    } else if (localStorage.getItem("apartments" + RoomNo.value) != null) {
      let aprtment = JSON.parse(
        localStorage.getItem("apartments" + RoomNo.value)
      );
      status.style.color = "red";
      status.innerHTML =
        "This room have been added already by: " + aprtment.username;
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  RoomNo.addEventListener("input", checkRoomNo);
  if (checkRoomNo()) {
    return true;
  } else {
    return false;
  }
}

function checkRegister() {
  //asigning variable
  let fName = document.getElementById("fName");
  let status = document.getElementById("status");
  let lName = document.getElementById("lName");
  let email = document.getElementById("Email");
  let username = document.getElementById("Username");
  let pass = document.getElementById("password");
  let repass = document.getElementById("Re-password");

  //checking firstname if its correct return true
  function checkFname() {
    if (fName.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter a firstname.";
    } else if (hasNumber(fName.value)) {
      status.style.color = "red";
      status.innerHTML = "Firstname can only contain letters.";
    } else if (fName.value.length >= 11 || fName.value.length <= 2) {
      status.style.color = "red";
      status.innerHTML = "Firstname can only be between 3 and 10 letters.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  fName.addEventListener("input", checkFname);
  //checking lastname if its correct return true
  function checkLname() {
    if (lName.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter a lastname.";
    } else if (hasNumber(lName.value)) {
      status.style.color = "red";
      status.innerHTML = "Lastname can only contain letters.";
    } else if (lName.value.length >= 11 || lName.value.length <= 2) {
      status.style.color = "red";
      status.innerHTML = "Lastname can only be between 3 and 10 letters.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  lName.addEventListener("input", checkLname);
  //checking email if its correct return true
  function checkEmail() {
    if (email.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter an e-mail.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  email.addEventListener("input", checkEmail);

  //checking username if its correct return true
  function checkUsername() {
    let user = localStorage.getItem(username.value);

    if (username.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter a username.";
    } else if (username.value.length >= 15 || username.value.length <= 3) {
      status.style.color = "red";
      status.innerHTML = "Username can only be between 4 and 15 characters..";
    } else if (user != null) {
      status.style.color = "red";
      status.innerHTML = "This username already exist.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  username.addEventListener("input", checkUsername);

  //checking password if its correct return true
  function checkPass() {
    if (pass.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter a password.";
    } else if (pass.value.length < 6) {
      status.style.color = "red";
      status.innerHTML = "Password can only be less than 6 characters.";
    } else if (repass.value != pass.value) {
      status.style.color = "red";
      status.innerHTML = "Password and re-password don't match.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  pass.addEventListener("input", checkPass);
  //checking re-password if its correct return true
  function checkRePass() {
    if (repass.value == "") {
      status.style.color = "red";
      status.innerHTML = "Please enter your re-password.";
    } else if (repass.value != pass.value) {
      status.style.color = "red";
      status.innerHTML = "Password and re-password don't match.";
    } else {
      status.innerHTML = "";
      return true;
    }
  }
  //adding listener to the textfield.
  repass.addEventListener("input", checkRePass);
  //if all check tests are true then return true for this whole function. else return false.
  if (
    checkFname() &&
    checkLname() &&
    checkEmail() &&
    checkUsername() &&
    checkPass() &&
    checkRePass()
  ) {
    return true;
  } else {
    return false;
  }
}

//checking session and defining log out function:
//if its logged
if (sessionStorage.getItem("logged") != null) {
  document.getElementById("loginNav").style.display = "none";
  document.getElementById("registerNav").style.display = "none";
  document.getElementById("logoutNav").style.display = "block";
  var logged = JSON.parse(sessionStorage.getItem("logged"));
  document.getElementById("logoutNav").innerHTML +=
    "Welcome " + logged.username + ",\n<a href='index.html'>Logout</a>";
  //if the user is on browse apartment page then do the following:
  if (document.URL.includes("browseApartment.html")) {
    var browseApartment = document.getElementById("browseApartment");

    //print the apartments
    browseApartment.innerHTML +=
      " " +
      "#" +
      "\t\t\t " +
      "RoomType" +
      "\t\t " +
      "RoomSize" +
      "\t\t " +
      "Smoke" +
      "\t\t " +
      "Added by" +
      "\n";
    browseApartment.innerHTML +=
      "_________________________________________________________________\n";
    for (let i = 1; i <= 999; i++) {
      if (localStorage.getItem("apartments" + i) != null) {
        let aprtment = JSON.parse(localStorage.getItem("apartments" + i));
        document.getElementById("noApartment").style.display = "none";
        //because Medium is a long word thats why we need to adjust its spacing.
          browseApartment.innerHTML +=
            " " +
            aprtment.RoomNo +
            "\t\t\t " +
            aprtment.RoomType +
            "\t\t\t " +
            aprtment.RoomSize +
            "\t\t\t " +
            aprtment.Smoke +
            "\t\t\t " +
            aprtment.username +
            "\n";
      }
    }
  }
  //if its not logged in
} else {
  document.getElementById("logoutNav").style.display = "none";
  document.getElementById("addApartmentNav").style.display = "none";
  document.getElementById("browseApartmentNav").style.display = "none";
}
document.getElementById("logoutNav").onclick = function () {
  sessionStorage.removeItem("logged");
  window.location.href = "index.html";
};

//this function for checking the username if it has a number
function hasNumber(myString) {
  return /\d/.test(myString);
}

//this function for checking the room number if its in the correct form.
function isCorrect(myValue) {
  return /^([1-9][0-9]{0,2})$/.test(myValue);
}
