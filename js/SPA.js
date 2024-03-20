const app = {
    pages: [],
    init: function () {
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        });
        history.replaceState({}, 'log-in-page', '#log-in-page');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function (ev) {
        ev.preventDefault();
        if (ev.target.id === 'log-out') {
            window.location.reload("Meeting.html");
        }
        else {
            let currentPage = ev.target.getAttribute('data-target');
            document.querySelector('.active').classList.remove('active');
            document.getElementById(currentPage).classList.add('active');
            history.pushState({}, currentPage, `#${currentPage}`);
        }
    },
    poppin: function (ev) {
        let hash = location.hash.replace('#', '');
        if (hash === 'sign-in-page' || hash === 'log-in-page') {
            document.querySelector('.active').classList.remove('active');
            document.getElementById(hash).classList.add('active');
            let arrInputs = document.getElementById(hash).querySelectorAll(".input");
            arrInputs.forEach(element => {
                element.value = "";
            });
            location.hash = "#log-in-page";
        } else {
            if (hash === 'All-meets-page' || hash === 'meet-page') {
                document.querySelector('.active').classList.remove('active');
                document.getElementById(hash).classList.add('active');
                let arrInputs = document.getElementById(hash).querySelectorAll(".input");
                arrInputs.forEach(element => {
                    element.value = "";
                });
                shortFormatDateTime();
            } else {
                if (hash === 'log-out') {
                    document.querySelector('.active').classList.remove('active');
                    document.getElementById(hash).classList.add('active');
                    location.hash='#';
                }
            }

        }


    }
}
document.addEventListener('DOMContentLoaded', app.init);