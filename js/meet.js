class Meet {
    constructor(code, nameMeet, dateMeet, timeMeet, done, remarks) {
        this.code = code;
        this.nameMeet = nameMeet;
        this.dateMeet = dateMeet;
        this.timeMeet = timeMeet;
        this.done = done;
        this.remarks = remarks;
    }
    addMeet(ev) {
        debugger;
        const fRequest = new FXMLHttpRequest();
        let url = "https://noaShimshi.com/api/meet/addNewMeeting"
        fRequest.ResponseType='json';
        fRequest.fOpen('POST', url);
        fRequest.fOnload = function () {
            if (fRequest.fResponse === "404")
            {
                alert("sorry, you already have a meeting in that time");
                document.getElementById("meet-page").classList.add("nav-link");
                app.nav(ev);
            }
            else {
                document.getElementById("save").classList.add("nav-link");
                app.nav(ev);
                let clearPage = document.getElementById("All-meets");
                clearPage.innerHTML = "";
                getAllMeetings();
            }
        }
        fRequest.fSend(JSON.stringify(this));
        fRequest.fOnload();
    }
    updateMeeting(ev) {
        const fRequest = new FXMLHttpRequest();
        fRequest.ResponseType='json';
        let url = "https://noaShimshi.com/api/meet/updateExistsMeeting"
        fRequest.fOpen('PUT', url);
        fRequest.fOnload = function () {
            if (fRequest.fResponse === "404")
            {
                alert("sorry, you already have a meeting in that time");
                document.getElementById("update").classList.add("nav-link");
                app.nav(ev);
            }
            else {
                document.getElementById("update").classList.add("nav-link");
                app.nav(ev);
                let clearPage = document.getElementById("All-meets");
                clearPage.innerHTML = "";
                getAllMeetings();
            }
        }
        fRequest.fSend(JSON.stringify(this));
        fRequest.fOnload();
    }

}
function removeMeeting() {
    let MeetId = this.getAttribute('data-meeting-id-cancel');
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = "https://noaShimshi.com/api/meet/removeMeeting"
    fRequest.fOpen('DELETE', url);
    fRequest.fOnload = function () {
        if (fRequest.fResponse === "404") {
            alert("Something went wrong...");
        }
        else {
            let clearPage = document.getElementById("All-meets");
            clearPage.innerHTML = "";
            getAllMeetings();
        }
    }
    fRequest.fSend(JSON.stringify(MeetId));
    fRequest.fOnload();
}

function getAllMeetings() {
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = "https://noaShimshi.com/api/user/getAllMeetings"
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function () {
        buildTheArrMeeting(JSON.parse(fRequest.fResponse));
    }
    fRequest.fSend();
    fRequest.fOnload();

}
function findMeeting(ev) {
    let MeetId = this.getAttribute('data-meeting-id-update');
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = `https://noaShimshi.com/api/meet=${MeetId}/getSpecificMeeting`
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function () {
        if (fRequest.fResponse === "404") {
            alert("Something went wrong...");
        }
        else {
            let objReturn = JSON.parse(fRequest.fResponse);
            document.getElementById("temp").classList.add("nav-link");
            app.nav(ev);
            document.getElementById('name-of-meeting').value = objReturn.nameMeet;
            document.getElementById('date').value = objReturn.dateMeet;
            document.getElementById('time').value = objReturn.timeMeet;
            document.getElementById('remarks').value = objReturn.remarks;
            let btnupdate = document.querySelector("#update");
            let btnNewMeeting = document.querySelector("#save");
            btnNewMeeting.style.visibility = "hidden";
            btnupdate.style.visibility = "visible";
        }
    }
    fRequest.fSend();
    fRequest.fOnload();
}

function doneMeeting(e) {
    let MeetId = this.getAttribute('data-meeting-id-done');
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = `https://noaShimshi.com/api/meet=${MeetId}/getSpecificMeeting`
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function () {
        if (fRequest.fResponse === "404") {
            alert("Something went wrong");
        }
        else {
            const fRequest2 = new FXMLHttpRequest();
            fRequest.ResponseType='json';
            let url = "https://noaShimshi.com/api/meet/doneMeeting"
            fRequest2.fOpen('PUT', url);
            fRequest2.fOnload = function () {
                if (fRequest2.fResponse === "404") {
                    alert("Something went wrong...");
                }
                else {
                    let clearPage = document.getElementById("All-meets");
                    clearPage.innerHTML = "";
                    getAllMeetings();

                }
            }
            fRequest2.fSend(fRequest.fResponse);
            fRequest2.fOnload();
        }
    }
    fRequest.fSend();
    fRequest.fOnload();
}
function buildTheArrMeeting(response) {
    let AllMeeting = document.getElementById("All-meets");
    let div = document.createElement('div');
    div.id = "gridMeeting";
    AllMeeting.appendChild(div);
    response.forEach(element => {
        let CreateMeeting = `<form class="build"><section id="meet${element.code}">
                <label class="cssLabel">name of meeting: ${element.nameMeet}</label><br>
                <label class="cssLabel">date of meeting: ${element.dateMeet}</label><br>
                <label class="cssLabel">time: ${element.timeMeet}</label><br>
                <label class="cssLabel">done: ${element.done}</label><br>
                <label class="cssLabel">remarks: ${element.remarks}</label><br><br>
                <button class="btn nice" data-meeting-id-cancel="${element.code}">cancel</button>
                <button class="btn nice" data-target="meet-page" data-meeting-id-update="${element.code}">update</button>
                <button class="btn nice done" id="${element.code}" data-meeting-id-done="${element.code}">done</button>
                </section></form>`;
        div.insertAdjacentHTML('beforeend', CreateMeeting);
        let btns = document.querySelectorAll(`#meet${element.code} button`);
        btns[0].addEventListener('click', removeMeeting);
        btns[1].addEventListener('click', findMeeting);
        btns[2].addEventListener('click', doneMeeting);
    });
    let doneArr = document.querySelectorAll('.done');
    response.forEach(element => {
        if (element.done === "true") {
            doneArr.forEach(element2 => {
                if (element2.id === element.code) {
                    element2.style.visibility = "hidden";
                }
            });

        }
    });
}
function buildCode() {
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = "https://noaShimshi.com/api/user/buildCodeToArrMeeting"
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function () {
        if (fRequest.fResponse === "404") {
            alert("Something went wrong...");
        }
        else {
            return JSON.parse(fRequest.fResponse);
        }
    }
    fRequest.fSend();
    return fRequest.fOnload();
}
function searchMeeting() {
    debugger;
    let btnSearch = document.getElementById('search-input').value;
    const fRequest = new FXMLHttpRequest();
    fRequest.ResponseType='json';
    let url = `https://noaShimshi.com/api/meetName=${btnSearch}/searchMeetings`
    fRequest.fOpen('GET', url);
    fRequest.fOnload = function () {
        if (fRequest.fResponse === "404") {
            alert("Something went wrong...");
        }
        else {
            let arrObj = JSON.parse(fRequest.fResponse);
            let clearPage = document.getElementById("All-meets");
            clearPage.innerHTML = "";
            buildTheArrMeeting(arrObj);
        }
    }
    fRequest.fSend();
    return fRequest.fOnload()
}


