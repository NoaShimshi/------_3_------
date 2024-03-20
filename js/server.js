class Server {
    constructor() {
        this.type = null;
        this.url = null;
        this.action = null;
        this.data = null;
    }

    handler(fajax) {
        this.url = fajax.url;
        this.type = fajax.type;
        this.data = fajax.data;
        this.findAction();
        return this.sendToTheDB();
    }
    findAction() {
        let tempArr = this.url.split('/');
        this.action = tempArr[5];
    }
    sendToTheDB() {
        if (this.type === "POST" && this.action === "signIn") {
            let answer = GetUser(JSON.parse(this.data));
            if (answer === null) {
                SetUser(JSON.parse(this.data))
                return "200";
            }
            else {
                return "404";
            }
        }
        if (this.type === "POST" && this.action === "logIn") {
            let person = GetUser(JSON.parse(this.data));
            if (person !== null) {
                if (JSON.parse(person).password !== JSON.parse(this.data).password) {
                    return "404";
                }
                else {
                    sessionStorage.setItem('currentUser', JSON.parse(person).email)
                    return "200";
                }
            }
        }
        if (this.type === "POST" && this.action === "addNewMeeting") {
            let currentUse = sessionStorage.getItem('currentUser');
            let arrMeetings = GetMeetings(currentUse);
            arrMeetings.forEach(element => {
                if (element.dateMeet === JSON.parse(this.data).dateMeet && element.timeMeet === JSON.parse(this.data).timeMeet && element.code !== JSON.parse(this.data).code) {
                    return "404";
                }
            });
            arrMeetings.push(JSON.parse(this.data));
            SetMeetings(arrMeetings);
            return "200";
        }
        if (this.type === "DELETE" && this.action === "removeMeeting") {
            debugger;
            let currentUse = sessionStorage.getItem('currentUser');
            let arrMeetings = GetMeetings(currentUse);
            let deleteItem;
            for (let index = 0; index < arrMeetings.length; index++) {
                if (arrMeetings[index].code == JSON.parse(this.data)) {
                    deleteItem = index;
                }
            }
            arrMeetings.splice(deleteItem, 1);
            SetMeetings(arrMeetings);
            return "200";
        }
        if (this.type === "GET" && this.action === "getAllMeetings") {
            return JSON.stringify(GetMeetings(sessionStorage.getItem('currentUser')));
        }
        if (this.type === "GET" && this.action === "buildCodeToArrMeeting") {
            let answer = buildCodeMeeting();
            if (answer === null) {
                return "404";
            }
            else {
                return JSON.stringify(answer);
            }
        }
        if (this.type === "GET" && this.action === "getSpecificMeeting") {
            debugger;
            let answer = null;
            let tempArr = this.url.split('/');
            let arr = tempArr[4].split('=');
            let arrMeetings = GetMeetings(sessionStorage.getItem('currentUser'))
            arrMeetings.forEach(element => {
                if (element.code == arr[1]) {
                    answer = element;
                }
            });
            if (answer === null) {
                return "404";
            }
            else {
                return JSON.stringify(answer);
            }
        }
        if (this.type === "GET" && this.action === "searchMeetings") {
            let arrSearch = [];
            let tempArr = this.url.split('/');
            let arr = tempArr[4].split('=');
            let currentUse = sessionStorage.getItem('currentUser');
            let arrMeetings = GetMeetings(currentUse);
            arrMeetings.forEach(element => {
                if (element.nameMeet == arr[1]) {
                    arrSearch.push(element);
                }
            });
            if (arr[1] === "") {
                return JSON.stringify(arrMeetings);
            }
            else {
                return JSON.stringify(arrSearch);
            }
        }
        if (this.type === "PUT" && this.action === "updateExistsMeeting") {
            debugger;
            let meeting = JSON.parse(this.data);
            let flag = true;
            let updateMeeting=null;
            let currentUse = sessionStorage.getItem('currentUser');
            let arrMeetings = GetMeetings(currentUse);
            arrMeetings.forEach(element => {
                if (element.dateMeet === meeting.dateMeet && element.timeMeet === meeting.timeMeet && element.code !== meeting.code) {
                    flag = false;
                }
                else {
                    if (element.code === meeting.code) {
                        updateMeeting=meeting;
                    }
                }
            });
            let updateIndex;
            for (let index = 0; index < arrMeetings.length; index++) {
                if (arrMeetings[index].code === meeting.code) {
                    updateIndex = index;
                }
            }
            arrMeetings[updateIndex] = updateMeeting;
            if (flag) {
                SetMeetings(arrMeetings);
                return "200";
            } else {
                return "404";
            }
        }
        if (this.type === "PUT" && this.action === "doneMeeting") {
            try {
                let doneTheMeeting = null;
                let currentUse = sessionStorage.getItem('currentUser');
                let arrMeetings = GetMeetings(currentUse);
                arrMeetings.forEach(element => {
                    if (element.code === JSON.parse(this.data).code) {
                        doneTheMeeting = element;
                        doneTheMeeting.done = 'true';
                    }
                });
                let DoneIndex;
                for (let index = 0; index < arrMeetings.length; index++) {
                    if (arrMeetings[index].code === JSON.parse(this.data).code) {
                        DoneIndex = index;
                    }
                }
                arrMeetings[DoneIndex] = doneTheMeeting;
                SetMeetings(arrMeetings);
                return "200";
            } catch (error) {
                return "404";
            }
        }
    }
}