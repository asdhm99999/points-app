// ========== إعدادات النقاط ==========
const POINTS_ON_REGISTER = 100;
const POINTS_SUBSCRIBE = 2;
const POINTS_PUBLISH = 3;
const POINTS_INVITE = 1;

// ========== وظائف عامة ==========
function saveUserData(username, points) {
    localStorage.setItem('user', JSON.stringify({ username, points }));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

function logout() {
    localStorage.removeItem('user');
    window.location = "login.html";
}

// ========== صفحة تسجيل الدخول ==========
if (window.location.pathname.endsWith("login.html")) {
    document.getElementById("loginForm").onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        if (username.length < 3) {
            document.getElementById("loginMessage").innerText = "اسم المستخدم يجب أن يكون 3 أحرف أو أكثر.";
            return;
        }
        // تحقق إذا المستخدم جديد أم لا
        let user = getUserData();
        if (!user || user.username !== username) {
            // مستخدم جديد
            saveUserData(username, POINTS_ON_REGISTER);
        }
        window.location = "index.html";
    };
}

// ========== الصفحة الرئيسية ==========
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
    const userInfoDiv = document.getElementById("userInfo");
    const messageDiv = document.getElementById("message");
    let user = getUserData();

    if (!user) {
        window.location = "login.html";
    } else {
        showUserInfo();
    }

    function showUserInfo() {
        userInfoDiv.innerHTML = `
            <p>اسم المستخدم: <b>${user.username}</b></p>
            <p>رصيد النقاط: <b id="points">${user.points}</b></p>
        `;
    }

    window.subscribeChannel = function () {
        user.points += POINTS_SUBSCRIBE;
        saveUserData(user.username, user.points);
        showUserInfo();
        showMessage("تم إضافة نقطتين بنجاح!");
    };

    window.publishAccount = function () {
        user.points += POINTS_PUBLISH;
        saveUserData(user.username, user.points);
        showUserInfo();
        showMessage("تم إضافة 3 نقاط بنجاح!");
    };

    window.inviteFriend = function () {
        user.points += POINTS_INVITE;
        saveUserData(user.username, user.points);
        showUserInfo();
        showMessage("تم إضافة نقطة واحدة بنجاح!");
    };

    window.logout = logout;

    function showMessage(msg) {
        messageDiv.innerText = msg;
        setTimeout(() => messageDiv.innerText = "", 2000);
    }
}