'use strict';
const modalBtn = document.querySelector('.modal-btn');
const account = document.querySelector('.account');
const contacts = document.querySelector('.contacts');

const loginForm = document.querySelector('#form');
const loginName = document.querySelector('#name');
const loginPassword = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const logOutBtn = document.querySelector('.logout-btn');
const contactClose = document.querySelector('.contact-close');
const userName = document.querySelector('.menu__user');
const formBg = document.querySelector('.form-bg');
const formBtn = document.querySelector('.form__btn');
const formAccount = document.querySelector('.form__account');

const accountForm = document.querySelector('#account__form');
const accountName = document.querySelector('#account-name');
const accountPassword = document.querySelector('#account-password');
const accountOrder = document.querySelector('#account-order');
const accountClose = document.querySelector('.account-close');
const accountBtn = document.querySelector('.account__btn--good');

const body = document.querySelector('body');
const questionsBtn = document.querySelector('.questions__btn');
const featuresCardBtn = document.querySelectorAll('.features__card-btn');
const accountTerms = document.querySelector('.account__terms');

let login = localStorage.getItem(`user`);
let loginCode = localStorage.getItem(`password`);

function allertWindow() {
    swal({
        text: "This is a demo version!",
        icon: "success",
        button: "Yes!",
    });
}

function allertDownload() {
    swal({
        title: "Demo",
        text: "demo version for download more content, files and other",
        icon: "success",
        button: "OK!",
    });
}

function accountModal() {
    account.classList.toggle('active');
    body.classList.toggle('active');
    accountForm.reset();
}

function toggleModal() {
    formBg.classList.toggle('active');
    body.classList.toggle('active');
    loginForm.reset();
}

function clearAccountForm() {
    accountForm.reset();
}

function clearModalForm() {
    loginName.style.borderColor = '';
    loginForm.reset();
}

function validName(str) {
    const regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/;
    return regName.test(str);
}

function validEmail(str) {
    const regEmail = /^\w+@\w+\.\w{2,}$/;
    return regEmail.test(str);
}

function signUp() {
    accountModal();

    if (formBg.classList.contains('active')) {
        toggleModal();
    }
}

function closeContactForm() {
    contacts.style.display = 'none';
    modalBtn.disabled = true;
    modalBtn.style.visibility = 'hidden';
}

function showContactForm() {
    contacts.style.display = 'block';
    modalBtn.disabled = false;
    modalBtn.style.visibility = 'visible';
}

function checkUserName() {
    if (login) {
        loginName.value = localStorage.getItem(`user`);
        loginPassword.value = localStorage.getItem(`password`);
        userName.style.display = 'inline-block';
        userName.textContent = login;

        closeContactForm();

        loginBtn.style.zIndex = '-1';
        logOutBtn.style.zIndex = '1';
    } else {
        showContactForm();

        loginBtn.style.zIndex = '1';
        logOutBtn.style.zIndex = '-1';
    }
}

function logIn() {
    if (validName(loginName.value) && validEmail(loginPassword.value)) {
        login = loginName.value;
        localStorage.setItem(`user`, login);
        loginCode = loginPassword.value;
        localStorage.setItem(`password`, loginCode);

        loginForm.reset();
        formBg.classList.remove('active');
        body.classList.remove('active');
        setTimeout(allertWindow, 500);

        closeContactForm();
    } else {
        if (!validName(loginName.value)) {
            loginName.style.borderColor = '#ff0000';
            loginName.textContent = '';
            loginName.setAttribute('title', 'One word in english. In first opinion, your name');
        } else {
            loginName.style.borderColor = '#9595c9';
        }

        if (!validEmail(loginPassword.value)) {
            loginPassword.style.borderColor = '#ff0000';
            loginPassword.textContent = '';
            loginPassword.setAttribute('title', 'Enter your e-mail. In the format myemail@gmail.com');
        } else {
            loginPassword.style.borderColor = '#9595c9';
        }
    }

    userName.style.display = 'inline-block';
    userName.textContent = login;
    console.log('Authorized');
}

function logOut() {
    login = null;
    loginCode = null;
    localStorage.clear();

    userName.style.display = '';
    userName.textContent = '';
    clearModalForm();
    clearAccountForm();

    console.log('notAuthorized');
}

function accountAllowTerms() {
    if (accountOrder.checked) {
        accountBtn.disabled = false;
        accountBtn.style.opacity = '1';
    } else {
        accountBtn.disabled = true;
        accountBtn.style.opacity = '0.5';
    }
}

function accountRegister() {
    if (validName(accountName.value) && validEmail(accountPassword.value) && accountOrder.checked) {
        login = accountName.value;
        localStorage.setItem(`user`, login);

        clearAccountForm();
        accountModal();
        setTimeout(allertWindow, 500);

        contacts.style.display = 'none';
        modalBtn.disabled = true;
        modalBtn.style.visibility = 'hidden';
        logOutBtn.style.zIndex = '7';
    } else {
        if (!validName(accountName.value)) {
            accountName.style.borderColor = '#ff0000';
            accountName.textContent = '';
        } else {
            accountName.style.borderColor = '#9595c9';
        }

        if (!validEmail(accountPassword.value)) {
            accountPassword.style.borderColor = '#ff0000';
            accountPassword.textContent = '';
        } else {
            accountPassword.style.borderColor = '#9595c9';
        }

        accountAllowTerms();

        alert(`
        Fill the required fields.
        Check for correct!
        `);
    }

    userName.style.display = 'inline-block';
    userName.textContent = login;
    console.log('Authorized');
}

// check localStorage
checkUserName();

// activate - deactivate 'login form'
loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal();
});
logOutBtn.addEventListener('click', function () {
    logOut();
    checkUserName();
    showContactForm();
});
formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logIn();
    checkUserName();
});
formBg.addEventListener('click', function (event) {
    if (event.target.classList.contains('active')) {
        toggleModal();
        clearModalForm();
    }
});

// activate - deactivate 'account registration form'
modalBtn.addEventListener('click', () => {
    accountAllowTerms();
    accountModal();
});
formAccount.addEventListener('click', () => {
    accountAllowTerms();
    signUp();
});
accountClose.addEventListener('click', accountModal);
account.addEventListener('click', function (event) {
    if (event.target.classList.contains('active')) {
        accountModal();
        clearAccountForm();
    }
});
accountBtn.addEventListener('click', (event) => {
    event.preventDefault();
    accountRegister();
});
accountOrder.addEventListener('click', () => {
    accountAllowTerms();
});

// another events
contactClose.addEventListener('click', toggleModal);
questionsBtn.addEventListener('click', allertDownload);
for (let i = 0; i < featuresCardBtn.length; i++) {
    featuresCardBtn[i].addEventListener('click', allertWindow);
}
accountTerms.addEventListener('click', allertDownload);

$(document).ready(function () {
    $('.menu__modal').on('click', function () {
        $('.menu__modal').toggleClass('menu__modal--active'),
            $('.menu__list').toggleClass('menu__list--active')
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        prevArrow: false,
        nextArrow: '<button class="slick-next" type="button"><img src="images/arrow.svg"></img></button>',
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.questions__item-title').on('click', function () {
        $('.questions__item').removeClass('questions__item--active');
        $('.questions__item-text').removeClass('questions__item-text--active');
        $(this).parent().addClass('questions__item--active');
        $(this).siblings().addClass('questions__item-text--active');
    });
});