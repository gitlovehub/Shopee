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

// Selectors
const hamburgerButton = document.querySelector('.hamburger');
const mobileMenuList = document.querySelector('.mobile__menu-list');
const mobileSubMenus = document.querySelectorAll('.mobile__menu-sub-list');
const bgHeader = document.querySelector('.bg-header');
const bodyScrollbar = document.querySelector('.body-scrollbar');
const headerLogo = document.querySelector('.header__logo');
const logoPath = document.querySelector('.logo-path');
const mobileNavbarRight = document.querySelector('.mobile__navbar-right');
const headerCart = document.querySelector('.header__cart');
const headerCartList = document.querySelector('.header__cart-list');
const headerCartItem = document.querySelector('.header__cart-item');
const headerSearch = document.querySelector('.header__search');
const headerSearchOption = document.querySelector('.header__search-option');
const mobileNavSearch = document.querySelector('.mobile__navbar-search');
const menuNotifyButtons = document.querySelectorAll('.mobile__menu-notify-btn');
const menuLanguageButtons = document.querySelectorAll('.mobile__menu-language-btn');
const menuBackButtons = document.querySelectorAll('.mobile__menu-back-btn');
const bgClrWhite = document.querySelector('.bg-clr-white');
const mobileNavbarUser = document.querySelector('.mobile__navbar-user');
const successToast = document.querySelector('#toast .toast--success');
const messageToast = document.querySelector('#toast .toast--message');

// Get the div element
const cartList = document.querySelector('#cart-list');
const headerNotify = document.querySelector('.header__notify');
const subListNotify = document.querySelector('.mobile__menu-sub-list-notify');

// Create a new div element to hold the HTML
const cartItems = document.createElement('div');
const notifyItems = document.createElement('div');
const mobileNotifyItems = document.createElement('div');

document.getElementById('area-user').style.display = 'none';
document.getElementById('cart-notify-qty').style.display = 'none';

// Check if the user is logged in
if (sessionStorage.getItem('isLoggedIn')) {
    processLoginSuccess();
    showSuccessToast();
}

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    // Get the element containing the number 4
    const numberFour = document.querySelector('.toast--message .toast__mess');
    // Set the countdown variable
    let countDown = 4;
    // Countdown function
    function countdown() {
        numberFour.innerHTML = `Tự động thoát sau ${countDown}`;
        if (countDown > 0) {
            countDown--;
            setTimeout(countdown, 999); // Repeat the function after ~ 1 second
        } else {
            // Perform action when the countdown is complete
            window.location.reload();
        }
    }

    // Clear the login session information in sessionStorage
    sessionStorage.clear();
    // Show message toast
    showMessageToast();
    // Start the countdown when the page is loaded
    setTimeout(countdown, 0);
});

function processLoginSuccess() {
    document.getElementById('area-user').style.display = 'flex';
    document.getElementById('area-login').style.display = 'none';
    document.getElementById('area-register').style.display = 'none';
    document.getElementById('cart-notify-qty').style.display = 'block';
    replaceUserIconWithAccountLink();
    updateSearchInputPlaceholder();
    setLoggedInStatus();
    updateCartList();
    updateNotify();
}

var loggedIn = false;
function setLoggedInStatus() {
    loggedIn = true;
}

function updateCartList() {
    // add cart items to cartItems element
    cartList.appendChild(cartItems);
    cartList.classList.remove('header__cart-list--empty-cart');
}

function updateNotify() {
    headerNotify.appendChild(notifyItems);
    headerNotify.classList.remove('header__notify--no-notify');
    subListNotify.appendChild(mobileNotifyItems);
    subListNotify.classList.remove('mobile__notify--no-notify');
}

function replaceUserIconWithAccountLink() {
    // add attributes and content to userAccount element
    // find the icon-user element and store it in the userIcon variable
    const userIcon = document.getElementById('icon-user');
    // create a new <a> element to replace the icon-user
    const userAccount = document.createElement('a');
    // add attributes and content to the new <a> element
    userAccount.href = 'form.html';
    userAccount.id = 'icon-user';
    userAccount.classList.add('mobile__navbar-user', 'mobile__navbar-item');
    const img = document.createElement('img');
    img.src = 'assets/images/avatar.jpg';
    img.alt = '';
    img.classList.add('mobile__navbar-user-img');
    userAccount.appendChild(img);
    // get the parent element mobile__navbar-left to add the new <a> element and remove the icon-user element
    const navbarLeft = document.querySelector('.mobile__navbar-left');
    navbarLeft.removeChild(userIcon);
    navbarLeft.appendChild(userAccount);
}

function updateSearchInputPlaceholder() {
    const inputPlaceholder = document.getElementById('search-input');
    inputPlaceholder.placeholder = 'Tìm kiếm sản phẩm mới...';
}

function showSuccessToast() {
    successToast.style.display = 'flex';
    // Hide toast
    setTimeout(function() {
        successToast.style.display = 'none';
    }, 4000);
}

function showMessageToast() {
    messageToast.style.display = 'flex';
    // Hide toast
    setTimeout(function() {
        messageToast.style.display = 'none';
    }, 4000);
}

const toastCloseBtns = document.querySelectorAll('.toast__close');
// Add click event listeners to close buttons
toastCloseBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const toast = btn.parentNode;
    toast.style.display = 'none';
  });
});

// Add click event listeners to hamburgerButton buttons
hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('active');
    mobileMenuList.classList.toggle('active');

    // Loop through each mobile__menu-sub-list element and toggle the active class
    mobileSubMenus.forEach((subMenu) => {
        subMenu.classList.toggle('active');
    });

    bgHeader.classList.toggle('active');
    bodyScrollbar.classList.toggle('active');
    logoPath.classList.toggle('active');
    mobileNavbarRight.classList.toggle('active');
    headerLogo.classList.toggle('active');
    bgClrWhite.classList.remove('bg-clr-white--active');

    // Select the media query using window.matchMedia
    const mediaQuery = window.matchMedia('(max-width: 63.9375em)');

    // Define a function to handle the media query changes
    const handleMediaQueryChange = (event) => {
        if (event.matches && !hamburgerButton.classList.contains('active')) {
            // If the media query matches, set the display property of the element
            document.getElementById('icon-user').style.display = 'flex';
        } else {
            // Otherwise, remove the display property
            document.getElementById('icon-user').style.display = 'none';
        }
    };

    // Call the function once to check the initial state of the media query
    handleMediaQueryChange(mediaQuery);

    // Add an event listener to handle future changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

});

mobileNavSearch .addEventListener('click', () => {
    headerSearch.classList.toggle('active');
});

// Add click event listeners to cart buttons
headerCart.addEventListener('click', () => {
    headerCartList.classList.toggle('header__cart-list--active');
    headerCartList.style.transition = 'all ease-out 0.5s';
});

headerCartList.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Add click event listeners to menu buttons
menuNotifyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        bgClrWhite.classList.add('bg-clr-white--active');
        mobileMenuList.style.transform = 'translateX(-522%)';
        mobileSubMenus.forEach(sub => sub.classList.remove('mobile__menu-sub-list--active'));
        mobileSubMenus[1].classList.add('mobile__menu-sub-list--active');
    });
});

menuLanguageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        bgClrWhite.classList.add('bg-clr-white--active');
        mobileMenuList.style.transform = 'translateX(-522%)';
        mobileSubMenus.forEach(sub => sub.classList.remove('mobile__menu-sub-list--active'));
        mobileSubMenus[0].classList.add('mobile__menu-sub-list--active');
    });
});

// Add click event listener to back button
menuBackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        bgClrWhite.classList.add('bg-clr-white--active');
        mobileMenuList.style.transform = 'translateX(0)';
        mobileSubMenus.forEach(sub => sub.classList.remove('mobile__menu-sub-list--active'));
    });
});

// Set the innerHTML of the new element to your HTML string
cartItems.innerHTML =
`
<h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
<ul class="header__cart-list-item">
    <a href="" class="header__cart-item">
        <img src="https://cf.shopee.vn/file/sg-11134201-22110-ryzedw66bcjv91_tn"
            alt="" class="header__cart-img">
        <div class="header__cart-item-info">
            <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                    Áo Khoác Hoodie Zip T1 mẫu CKTG
                </h5>
                <div class="header__cart-item-price-wrap">
                    <span class="header__cart-item-price">797.000</span>
                    <span class="header__cart-item-multiply">x</span>
                    <span class="header__cart-item-quantity">2</span>
                </div>
            </div>
            <div class="header__cart-item-body">
                <span class="header__cart-item-description">Phân loại: Cao
                    cấp</span>
                <button
                    class="hide-on-mobile-tablet header__cart-item-remove">Xóa</button>
                <button class="btn btn--primary header__cart-item-remove">Xóa</button>
            </div>
        </div>
    </a>
    <a href="" class="header__cart-item">
        <img src="https://cf.shopee.vn/file/sg-11134201-23020-q2f1xu93zzmvbe_tn"
            alt="" class="header__cart-img">
        <div class="header__cart-item-info">
            <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                    Áo Thun Jersey GenG 2022 Esports Cho Nam
                </h5>
                <div class="header__cart-item-price-wrap">
                    <span class="header__cart-item-price">199.000</span>
                    <span class="header__cart-item-multiply">x</span>
                    <span class="header__cart-item-quantity">1</span>
                </div>
            </div>
            <div class="header__cart-item-body">
                <span class="header__cart-item-description">Phân loại: Cao
                    cấp</span>
                <button
                    class="hide-on-mobile-tablet header__cart-item-remove">Xóa</button>
                <button class="btn btn--primary header__cart-item-remove">Xóa</button>
            </div>
        </div>
    </a>
    <a href="" class="header__cart-item">
        <img src="https://cf.shopee.vn/file/sg-11134201-22100-q41zgty4y0iv25_tn"
            alt="" class="header__cart-img">
        <div class="header__cart-item-info">
            <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">Áo Thun T1 Mẫu CKTG 2022 cổ tròn
                </h5>
                <div class="header__cart-item-price-wrap">
                    <span class="header__cart-item-price">745.500</span>
                    <span class="header__cart-item-multiply">x</span>
                    <span class="header__cart-item-quantity">3</span>
                </div>
            </div>
            <div class="header__cart-item-body">
                <span class="header__cart-item-description">Phân loại: Thời
                    trang</span>
                <button
                    class="hide-on-mobile-tablet header__cart-item-remove">Xóa</button>
                <button class="btn btn--primary header__cart-item-remove">Xóa</button>
            </div>
        </div>
    </a>
    <a href="" class="header__cart-item">
        <img src="https://cf.shopee.vn/file/sg-11134201-22110-cziyazug9qjv01_tn"
            alt="" class="header__cart-img">
        <div class="header__cart-item-info">
            <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                    Áo Khoác Đồng Phục 2022 DWG KIA tại CKTG
                </h5>
                <div class="header__cart-item-price-wrap">
                    <span class="header__cart-item-price">290.000</span>
                    <span class="header__cart-item-multiply">x</span>
                    <span class="header__cart-item-quantity">1</span>
                </div>
            </div>
            <div class="header__cart-item-body">
                <span class="header__cart-item-description">Phân loại: Thời
                    trang</span>
                <button
                    class="hide-on-mobile-tablet header__cart-item-remove">Xóa</button>
                <button class="btn btn--primary header__cart-item-remove">Xóa</button>
            </div>
        </div>
    </a>
    <a href="" class="header__cart-item">
        <img src="https://cf.shopee.vn/file/sg-11134201-22110-z5dw8oz3akjvd1_tn"
            alt="" class="header__cart-img">
        <div class="header__cart-item-info">
            <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                    DRX Jersey 2022 LOL LCK Deft
                </h5>
                <div class="header__cart-item-price-wrap">
                    <span class="header__cart-item-price">398.000</span>
                    <span class="header__cart-item-multiply">x</span>
                    <span class="header__cart-item-quantity">2</span>
                </div>
            </div>
            <div class="header__cart-item-body">
                <span class="header__cart-item-description">Phân loại: Thời
                    trang</span>
                <button
                    class="hide-on-mobile-tablet header__cart-item-remove">Xóa</button>
                <button class="btn btn--primary header__cart-item-remove">Xóa</button>
            </div>
        </div>
    </a>
</ul>
<a href="" class="header__cart-view-cart btn btn--primary">Xem giỏ hàng</a>
`;

notifyItems.innerHTML =
`
<header class="header__notify-header">
    <h3>Thông báo mới nhận</h3>
</header>
<ul class="header__notify-list">
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/9da9a3acb5520d601f86a90434f455a5_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">VOUCHER HOÀN 200K XU TRỞ LẠI</span>
                <span class="header__notify-disc">2 Voucher hoàn đến 200k xu đơn hàng
                    400k. Hoàn xu bùng nổ - mua không cần cố!</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/96385a65fa50800e096bb790fa5c1dba_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">21H! HẠ GIÁ 1K - RẺ QUÁ XÁ</span>
                <span class="header__notify-disc">Dây bảo vệ cáp sạc, toner dưỡng da.
                    Khẩu trang, khăn lau bếp đa năng - Deal từ 1k còn được
                    Freeship</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/a8d76bca057ba0b117dcf8e1ef068d16_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">Bạn bỏ quên Mã Freeship 0đ!</span>
                <span class="header__notify-disc">Mã đã có sẵn trong ví. Không sài hết
                    hạn đừng tiếc đó!</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">GIỜ ĂN ĐẾN RỒI! ĐỪNG ĐỂ BỤNG
                    ĐÓI!</span>
                <span class="header__notify-disc">Voucher đến 30k cho bạn thân. Đến 25k
                    cho bạn mới (trà sữa, gà ráng, phở, bún miếng). Toàn món ngon - Đặt
                    là đến ngay!</span>
            </div>
        </a>
    </li>
</ul>
<span class="header__notify-footer">
    <a href="" class="header__notify-footer-btn">Xem tất cả</a>
</span>
`;

mobileNotifyItems.innerHTML =
`
<header class="header__notify-header">
    <h3>Thông báo mới nhận</h3>
</header>
<ul class="header__notify-list">
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/9da9a3acb5520d601f86a90434f455a5_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">VOUCHER HOÀN 200K XU TRỞ LẠI</span>
                <span class="header__notify-disc">2 Voucher hoàn đến 200k xu đơn hàng
                    400k. Hoàn xu bùng nổ - mua không cần cố!</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/96385a65fa50800e096bb790fa5c1dba_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">21H! HẠ GIÁ 1K - RẺ QUÁ XÁ</span>
                <span class="header__notify-disc">Dây bảo vệ cáp sạc, toner dưỡng da.
                    Khẩu trang, khăn lau bếp đa năng - Deal từ 1k còn được
                    Freeship</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/a8d76bca057ba0b117dcf8e1ef068d16_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">Bạn bỏ quên Mã Freeship 0đ!</span>
                <span class="header__notify-disc">Mã đã có sẵn trong ví. Không sài hết
                    hạn đừng tiếc đó!</span>
            </div>
        </a>
    </li>
    <li class="header__notify-item header__notify-item--view">
        <a href="" class="header__notify-link">
            <img src="https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi"
                alt="" class="header__notify-img">
            <div class="header__notify-info">
                <span class="header__notify-name">GIỜ ĂN ĐẾN RỒI! ĐỪNG ĐỂ BỤNG
                    ĐÓI!</span>
                <span class="header__notify-disc">Voucher đến 30k cho bạn thân. Đến 25k
                    cho bạn mới (trà sữa, gà ráng, phở, bún miếng). Toàn món ngon - Đặt
                    là đến ngay!</span>
            </div>
        </a>
    </li>
</ul>
<span class="header__notify-footer">
    <a href="" class="header__notify-footer-btn">Xem tất cả</a>
</span>
`;

const button = document.getElementById('typing-enter');

// Listen for the 'Enter' key press event on the document
document.addEventListener('keydown', event => {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        // Trigger a click event on the button
        button.click();
    }
});