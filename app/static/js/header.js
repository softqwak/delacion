// Скрипт для управления мобильным меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const logo = document.getElementById('logo');
const fontLogo = document.getElementById('font-logo');
// Массив строгих шрифтов, которые передают ощущение богатства
// const fonts = [
//     'Bodoni Moda', 'Didot', 'Garamond', 'Trajan Pro', 'Baskerville', 'Palatino Linotype', 'Baskerville Old Face', 'Georgia',
//     'Times New Roman', 'Playfair Display', 'Crimson Text', 'Montserrat'
// ];
const fonts = ['Montserrat']
let font_count = 0;

// Функция для смены шрифта логотипа
function changeLogoFont() {
    const newFont = fonts[font_count];
    logo.style.fontFamily = newFont; // Применяем случайный шрифт
    // fontLogo.innerText = newFont;
    font_count += 1;
    if (font_count == fonts.length)
    {
        font_count = 0;
    }
}

// Вызываем смену шрифта с небольшим интервалом
setInterval(changeLogoFont, 1000); 


// Событие для переключения мобильного меню
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show'); // Переключаем класс для показа меню
});

function openAuthWindow() {
    document.getElementById("auth-popup").style.display = "flex";
}

function closeAuthWindow() {
    document.getElementById("auth-popup").style.display = "none";
}

window.onscroll = function() {
    const header = document.getElementById("header-top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
};

// Функция для кнопки "Go Up"
function toggleGoUp() {
    // Получаем текущую позицию прокрутки
    const scrollPosition = window.scrollY;
    
    // Если прокрутка больше 100, прокручиваем вверх
    if (scrollPosition > 100) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    }
}

// Функция для переключения анимаций
function toggleAnimations() {
    // Переключаем класс "no-animations" на body
    document.body.classList.toggle('no-animations');
    
    // Уведомляем пользователя об изменении
    if (document.body.classList.contains('no-animations')) {
        alert('Animations are disabled.');
    } else {
        alert('Animations are enabled.');
    }
}

// Функция для переключения темной темы
function toggleDarkMode() {
    // Переключаем класс "dark-mode" на body
    document.body.classList.toggle('dark-mode');
    
    // Уведомляем пользователя об изменении
    if (document.body.classList.contains('dark-mode')) {
        alert('Dark mode is enabled.');
    } else {
        alert('Dark mode is disabled.');
    }
}

// Функция для открытия раздела FAQ
function openFAQ() {
    // Здесь можно реализовать открытие модального окна или нового раздела с FAQ
    const faqPopup = document.getElementById('faq-popup');
    faqPopup.style.display = 'block'; // Показываем модальное окно
}

// Функция для закрытия раздела FAQ
function closeFAQ() {
    const faqPopup = document.getElementById('faq-popup');
    faqPopup.style.display = 'none'; // Скрываем модальное окно
}

// Обработчик события для закрытия модального окна при клике вне его
window.onclick = function(event) {
    const faqPopup = document.getElementById('faq-popup');
    if (event.target === faqPopup) {
        faqPopup.style.display = 'none';
    }
}