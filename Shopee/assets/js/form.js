sessionStorage.clear();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var action = urlParams.get('action');

const navbarTitle = document.querySelector('.header__navbar-title');
const registerForm = document.querySelector('.auth-form-register');
const loginForm = document.querySelector('.auth-form-login');

if (action === 'register') {
    document.title = 'Đăng ký ngay | Shopee Việt Nam';
    registerForm.style.display = 'block';
    navbarTitle.textContent = 'Đăng ký';
} else if (action === 'login') {
    loginForm.style.display = 'block';
}

setTimeout(function() {
    guideContainer.style.transition = 'all linear 0.3s';
}, 1000);

// To change the background color of the header when the user scrolls
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      header.style.boxShadow = '0 4px 4px #00000026';
    } else {
      header.style.boxShadow = 'none';
    }
});

const socialsTitleFacebook = document.querySelectorAll('.socials-title-facebook');
const socialsTitleGoogle = document.querySelectorAll('.socials-title-google');
const socialsTitleApple = document.querySelector('.socials-title-apple');

// Select the media query using window.matchMedia
const mediaQuerySmaller = window.matchMedia('(max-width: 35.4375em)');
// Define a function to handle the media query changes
const handleMediaQuerySmallerChange = (event) => {
    if (event.matches) {
        // Loop through each element in the NodeList and set the text content
        socialsTitleFacebook.forEach((element) => {
            element.textContent = 'Đăng nhập với Facebook';
        });
        socialsTitleGoogle.forEach((element) => {
            element.textContent = 'Đăng nhập với Google';
        });
        socialsTitleApple.textContent = 'Đăng nhập với Apple';

    } else {
        socialsTitleFacebook.forEach((element) => {
            element.textContent = 'Facebook';
        });
        socialsTitleGoogle.forEach((element) => {
            element.textContent = 'Google';
        });
        socialsTitleApple.textContent = 'Apple';
    }
};
// Call the function once to check the initial state of the media query
handleMediaQuerySmallerChange(mediaQuerySmaller);
// Add an event listener to handle future changes to the media query
mediaQuerySmaller.addEventListener('change', handleMediaQuerySmallerChange);

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginPhoneInput = document.getElementById('login-phone-input');
const loginFormGroup = document.querySelectorAll('.login-form__group');
const phoneFormGroup = document.querySelector('.phone-form__group');
const registerPhoneInput = document.getElementById('register-phone-input');
const submitLoginButton = document.getElementById('submit-login-btn');
const submitRegisterButton = document.getElementById('submit-register-btn');
const eyeButton = document.querySelector('.auth-form__input-eye-btn');
const closeEye = document.querySelector('.close-eye');
const openEye = document.querySelector('.open-eye');

submitLoginButton.addEventListener('click', function() {
    if (emailInput.value === 'admin' && passwordInput.value === '123') {
        sessionStorage.setItem('isLoggedIn', true);
        window.location.href = 'index.html';
    }
});

function checkInputs() {  
    if (emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
        submitLoginButton.classList.add('pointer');
    } else {
        submitLoginButton.classList.remove('pointer');
    }
}
emailInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);

function checkLoginPhoneInput() {  
    if (loginPhoneInput.value.trim() !== '') {
        submitLoginButton.classList.add('pointer');
    } else {
        submitLoginButton.classList.remove('pointer');
    }
}
loginPhoneInput.addEventListener('input', checkLoginPhoneInput);

function checkRegisterPhoneInput() {  
    if (registerPhoneInput.value.trim() !== '') {
        submitRegisterButton.classList.add('pointer');
    } else {
        submitRegisterButton.classList.remove('pointer');
    }
}
registerPhoneInput.addEventListener('input', checkRegisterPhoneInput);

// Show password
eyeButton.addEventListener('click', function() {
    closeEye.classList.toggle('hidden-eye');
    openEye.classList.toggle('hidden-eye');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

const useScan = document.querySelector('.auth-form__heading-scan--active');
const usePassword = document.querySelector('.auth-form__heading-scan:not(.auth-form__heading-scan--active)');
const headingText = document.querySelector('.auth-form__heading-text');
const heading = document.querySelector('.auth-form-login__heading');
const hiddens = document.querySelectorAll('.hide');
const formQrContent = document.querySelector('.login-form__qr-content');
const useSms = document.querySelector('.auth-form__help-sms');
const formHelpPassword = document.querySelector('.auth-form__help-password');
const loginFormInputs = document.querySelectorAll('.login-form__input');
const guideButton = document.querySelector('.login-form__qr-btn');
const guideContainer = document.querySelector('.scanner-guide__container');
const guideCloseButton = document.querySelector('.scanner-guide__close-btn');
const switchFormButtons = document.querySelectorAll('.auth-form__bottom-btn');
const bodyScrollbar = document.querySelector('.body-scrollbar');

let switchFormButtonsClickCount = 0;
switchFormButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // code to execute when button is clicked
        switchFormButtonsClickCount++;
        console.log(switchFormButtonsClickCount)
        if (switchFormButtonsClickCount % 2 === 1) {
            document.title = 'Đăng ký ngay | Shopee Việt Nam';
            navbarTitle.textContent = 'Đăng ký';
            registerForm.style.display = 'block'
            loginForm.style.display = 'none'
        } else {
            document.title = 'Đăng nhập tài khoản - Mua sắm Online | Shopee Việt Nam';
            navbarTitle.textContent = 'Đăng nhập';
            registerForm.style.display = 'none'
            loginForm.style.display = 'block'
        }
    });
});

useScan.addEventListener('click', function() {
    useScan.classList.remove('auth-form__heading-scan--active');
    usePassword.classList.add('auth-form__heading-scan--active');
    headingText.innerHTML = 'Đăng nhập với mật khẩu';
    heading.innerHTML = 'Đăng nhập với mã QR';
    hiddens.forEach(function(form) {
        form.style.display = 'none';
    });
    formQrContent.style.display = 'flex';
});

usePassword.addEventListener('click', function() {
    usePassword.classList.remove('auth-form__heading-scan--active');
    useScan.classList.add('auth-form__heading-scan--active');
    headingText.innerHTML = 'Đăng nhập với mã QR';
    heading.innerHTML = 'Đăng nhập';
    hiddens.forEach(function(form) {
        form.style.display = 'block';
    })
    formQrContent.style.display = 'none';
});

let useSmsClickCount = 0;
useSms.addEventListener('click', function() {
    useSmsClickCount++;
    if (useSmsClickCount % 2 === 1) {
        useSms.textContent = 'Đăng nhập với mật khẩu';
        formHelpPassword.textContent = '';
        loginFormGroup.forEach(function(form) {
            form.style.display = 'none';
        });
        eyeButton.style.display = 'none';
        phoneFormGroup.style.display = 'block';
        submitLoginButton.textContent = 'TIẾP THEO';

        if (window.matchMedia("(max-width: 35.4375em)").matches) {
            document.querySelector('.login-ti-mobile').style.display = 'block';
        } else {
            document.querySelector('.login-ti-mobile').style.display = 'none';
        }

    } else {
        useSms.textContent = 'Đăng nhập với SMS';
        formHelpPassword.textContent = 'Quên mật khẩu';
        loginFormGroup.forEach(function(form) {
            form.style.display = 'block';
        });
        eyeButton.style.display = 'block';
        phoneFormGroup.style.display = 'none';
        submitLoginButton.textContent = 'ĐĂNG NHẬP';

        if (window.matchMedia("(max-width: 35.4375em)").matches) {
            document.querySelector('.login-ti-mobile').style.display = 'none';
        } else {
            document.querySelector('.login-ti-mobile').style.display = 'none';
        }
    }
});

// Select the media query using window.matchMedia
const mediaQuery = window.matchMedia('(min-width: 35.4375em) and (max-width: 63.9375em)');

let guideButtonClickCount = 0;
guideButton.addEventListener('click', function() {
    guideButtonClickCount++;
    bodyScrollbar.classList.add('active');
    if (guideButtonClickCount % 2 === 1) {
        guideContainer.style.transform = 'translateX(0%)';
        guideContainer.style.opacity = '1';

        // Define a function to handle the media query changes
        const handleMediaQueryChange = (event) => {
            if (event.matches) {
                if (guideButtonClickCount % 2 === 0) {
                    loginForm.style.display = 'block';
                } else {
                    loginForm.style.display = 'none';
                    guideContainer.style.display = 'flex';
                    guideContainer.style.marginRight = '0';
                }
            } else {
                loginForm.style.display = 'block';
                guideContainer.style.display = 'flex';
                guideContainer.style.marginRight = '12px';
            }
        };
        // Call the function once to check the initial state of the media query
        handleMediaQueryChange(mediaQuery);
        // Add an event listener to handle future changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        
    } else {
        loginForm.style.display = 'block';

        // Define a function to handle the media query changes
        const handleMediaQueryChange = (event) => {
            if (event.matches && guideContainer.style.display === 'flex') {
                // If the media query matches, set the display property of the element
                guideContainer.style.display = 'none';
            } else {
                // Otherwise, remove the display property
                guideContainer.style.transform = 'translateX(100%)';
                guideContainer.style.marginRight = '0';
                guideContainer.style.opacity = '0';
            }
        };
        // Call the function once to check the initial state of the media query
        handleMediaQueryChange(mediaQuery);
        // Add an event listener to handle future changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    }
});

guideCloseButton.addEventListener('click', function() {
    guideButtonClickCount = 0;
    loginForm.style.display = 'block';
    bodyScrollbar.classList.remove('active');

    // Define a function to handle the media query changes
    const handleMediaQueryChange = (event) => {
        if (event.matches && guideContainer.style.display === 'flex') {
            // If the media query matches, set the display property of the element
            guideContainer.style.display = 'none';
        } else {
            // Otherwise, remove the display property
            guideContainer.style.transform = 'translateX(100%)';
            guideContainer.style.marginRight = '0';
            guideContainer.style.opacity = '0';
        }
    };
    // Call the function once to check the initial state of the media query
    handleMediaQueryChange(mediaQuery);
    // Add an event listener to handle future changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    guideContainer.style.transform = 'translateX(100%)';
    guideContainer.style.marginRight = '0';
    guideContainer.style.opacity = '0';
});

if (registerForm.style.display === 'block') {
    document.title = 'Đăng ký ngay | Shopee Việt Nam';
    loginForm.style.display = 'none';
    navbarTitle.textContent = 'Đăng ký'
} else {
    document.title = 'Đăng nhập tài khoản - Mua sắm Online | Shopee Việt Nam';
    loginForm.style.display = 'block';
    navbarTitle.textContent = 'Đăng nhập'
}