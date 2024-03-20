function GetUser(person) {
    return localStorage.getItem(person.email)
}
function SetUser(newPerson) {
    sessionStorage.setItem('currentUser', newPerson.email)
    localStorage.setItem(newPerson.email, JSON.stringify(newPerson));
}
function GetMeetings(email)
{
   return JSON.parse(localStorage.getItem(email)).meetings;
}
function SetMeetings(meetings)
{
    let obj=JSON.parse(localStorage.getItem(sessionStorage.getItem('currentUser')));
    obj.meetings=meetings;
    localStorage.setItem(sessionStorage.getItem('currentUser'), JSON.stringify(obj));
}
function buildCodeMeeting() {
    if (!localStorage.getItem('idMeet')) {
        localStorage.setItem('idMeet', 0);
        sessionStorage.setItem('currentMeet', 0);
        return localStorage.getItem('idMeet');
    }
    else {
        let tempCode = localStorage.getItem('idMeet');
        tempCode++;
        localStorage.setItem('idMeet', tempCode);
        sessionStorage.setItem('currentMeet', tempCode);
        return localStorage.getItem('idMeet');
    }
}