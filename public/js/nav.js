const navbar = document.querySelector('.navbar');

window.addEventListener('scroll',()=>{
    if (scrollY >= 180) {
        navbar.classList.add('bg');
    }else{
        navbar.classList.remove('bg');
    }
})

const createNavbar = () => {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `<ul class="links-container">
    <li class="link-item"><a href="../index.html" class="link active">home</a></li>
    <li class="link-item"><a href="../search.html" class="link">product</a></li>
    <li class="link-item"><a href="../product.html" class="link">about</a></li>
    <li class="link-item"><a href="#" class="link">contact</a></li>
</ul>
<div class="user-interactions">
    <div class="cart">
        <img src="../images/cart.webp" class="cart-icon" alt="">
        <span class="cart-item-count">00</span>
    </div>
    <div class="user">
        <img src="../images/user.webp" class="user-icon" alt="">
        <div class="user-icon-popup">
          <p>login to your account</p>
          <a>login</a>
        </div>
    </div>
</div>
`
}
createNavbar();

//user icon popup
let userIcon = document.querySelector('.user-icon');
let userPopupIcon = document.querySelector('.user-icon-popup');

userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let user = JSON.parse(sessionStorage.user || null);

if(user != null){//user is logged in
    text.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click',() => logout());
}else{
    text.innerHTML = 'login to your account';
    actionBtn.innerHTML = 'login';
    actionBtn.addEventListener('click', () => location.href = '/login');
}
const logout = () => {
    sessionStorage.clear()
    location.reload();
}