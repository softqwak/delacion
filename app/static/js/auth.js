function openAuthWindow() {
    document.getElementById("auth-popup").style.display = "flex";
}

function closeAuthWindow() {
    document.getElementById("auth-popup").style.display = "none";
    document.getElementById("error-message").textContent = ""; // Очистка сообщения об ошибке
}

function validateForm(event) {
    event.preventDefault(); // Останавливаем отправку формы

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!validateEmail(email)) {
        errorMessage.textContent = "Введите корректный email.";
    } else if (password.length < 6) {
        errorMessage.textContent = "Пароль должен содержать минимум 6 символов.";
    } else {
        errorMessage.textContent = "";
        alert("Авторизация успешна!"); // Успешная авторизация (можно заменить на другую логику)
        closeAuthWindow();
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простой шаблон для email
    return re.test(email);
}

function resetPassword() {
    alert("Функция восстановления пароля находится в разработке.");
}

function register() {
    alert("Функция регистрации находится в разработке.");
}
