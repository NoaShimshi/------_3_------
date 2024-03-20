document.addEventListener('DOMContentLoaded', domLoaded);

function domLoaded(e) {
    let btnSign = this.querySelector("#sign-in-btn");
    btnSign.addEventListener('click', signIn);
    let btnLog = this.querySelector("#log-in-btn");
    btnLog.addEventListener('click', logIn);
    let btnNewMeeting = this.querySelector("#save");
    btnNewMeeting.addEventListener('click', newMeet);
    let btnLogOut = this.querySelector("#log-out");
    btnLogOut.addEventListener('click', logOut);
    let btnupdate = this.querySelector("#update");
    btnupdate.addEventListener('click', update);
    let btnCreateMeeting = this.querySelector("#temp");
    btnCreateMeeting.addEventListener('click', clearAllDitails);
    let btnSearchMeeting = this.querySelector("#search");
    btnSearchMeeting.addEventListener('click', searchMeeting);
}
function signIn(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let regexName = /^[a-zA-Z\s]*$/;
    if (checkIfTheDataIsCorrect(email, password) && (regexName.test(name)&&name!=="")) {
        const newUser = new User(name, email, password);
        newUser.signIn(e);
    }
    else
    {
        if (!regexName.test(name)||name==="") {
            alert("The name is'nt valid");
        }  
    }
}
function logIn(e) {
    e.preventDefault();
    let passwordLog = document.getElementById("log-password").value;
    let emailLog = document.getElementById("log-email").value;
    if (checkIfTheDataIsCorrect(emailLog, passwordLog)) {
        const existsUser = new User("", emailLog, passwordLog);
        existsUser.logIn(e);
    }
}
function checkIfTheDataIsCorrect(email, password) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword = /\d{9,9}/g;
    if (regexEmail.test(email) && regexPassword.test(password)) {
        return true;
    } else {
        if (regexEmail.test(email) === false) {
            alert("Gmail is not valid");
        }
        if (regexPassword.test(password) === false) {
            alert("Password is not valid, please enter 9 digits");
        }
    }
}
function logOut(e) {
    e.preventDefault();
    sessionStorage.clear();
    let clearPage = document.getElementById("All-meets");
    clearPage.innerHTML = "";
    document.getElementById("log-password").value = "";
    document.getElementById("log-email").value = "";
    
}
function shortFormatDateTime() {
    let today = new Date();
    let inputDate = document.querySelector("#date");
    let month = today.getMonth();
    let day = today.getDate();
    if ((today.getMonth() + 1) < 10) {
        month = "0" + (today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
        day = "0" + today.getDate();
    }
    inputDate.value = `${today.getFullYear()}-${month}-${day}`;
    inputDate.min = `${today.getFullYear()}-${month}-${day}`;
    let inputTime = document.getElementById("time");
    let hour = today.getHours();
    let minutes = today.getMinutes();
    if (today.getHours() < 10) {
        hour = "0" + (today.getMonth() + 1);
    }
    if (today.getMinutes() < 10) {
        minutes = "0" + today.getMinutes();
    }
    inputTime.value = `${hour}:${minutes}`;
}
function clearAllDitails() {
    let btnupdate = document.querySelector("#update");
    let btnNewMeeting = document.querySelector("#save");
    btnNewMeeting.style.visibility = "visible";
    btnupdate.style.visibility = "hidden";
    let nameOfMeeting = document.getElementById("name-of-meeting").value = "";
    let remarks = document.getElementById("remarks").value = "";
    shortFormatDateTime();
}
function newMeet(e) {
    let nameOfMeeting = document.getElementById("name-of-meeting").value;
    let dateOfMeeting = document.getElementById("date").value;
    let timeOfMeeting = document.getElementById("time").value;
    let remarks = document.getElementById("remarks").value;
    if( nameOfMeeting !== "")
    {
        let temp=buildCode();
        const newMeeting = new Meet(temp, nameOfMeeting, dateOfMeeting, timeOfMeeting, 'false', remarks);
        newMeeting.addMeet(e);
    }
    else {
        alert("enter name");
    }
}
function update(e) {
    let idMeeting=sessionStorage.getItem('currentMeet');
    let nameOfMeeting = document.getElementById("name-of-meeting").value;
    let dateOfMeeting = document.getElementById("date").value;
    let timeOfMeeting = document.getElementById("time").value;
    let remarks = document.getElementById("remarks").value;
    let regexName = /^[a-zA-Z\s]*$/;
    if (regexName.test(nameOfMeeting) && nameOfMeeting !== "") {
        const newMeeting = new Meet(idMeeting, nameOfMeeting, dateOfMeeting, timeOfMeeting, 'false', remarks);
        newMeeting.updateMeeting(e);
    }
    else {
        alert("The name is not valid");
    }
}


