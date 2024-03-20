class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.meetings = [];
    }
    signIn(ev) {
        debugger;
        const fRequest = new FXMLHttpRequest();
        debugger;
        fRequest.ResponseType='json';
        let url = "https://noaShimshi.com/api/user/signIn"
        fRequest.fOpen('POST', url);
        fRequest.fOnload = function () {
            if (fRequest.fResponse === "404")
            {
                alert("sorry, this email is exists");
            }
            else {
                document.getElementById("sign-in-btn").classList.add("nav-link");
                app.nav(ev);
            }
        }
        fRequest.fSend(JSON.stringify(this));
        fRequest.fOnload();
    }
    logIn(ev) {
        debugger;
        const fRequest = new FXMLHttpRequest();
        fRequest.ResponseType='json';
        let url = "https://noaShimshi.com/api/user/logIn"
        fRequest.fOpen('POST', url);
        fRequest.fOnload = function () {
            if (fRequest.fResponse === "404")
            {
                alert("sorry, the email or the password are inncorect");
            }
            else {
                document.getElementById("log-in-btn").classList.add("nav-link");
                app.nav(ev);
                getAllMeetings();
            }
        }
        fRequest.fSend(JSON.stringify(this));
        fRequest.fOnload();
    }
}

