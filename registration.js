// Функция для открытия всплывающего окна регистрации пользователя
document
	.getElementById("userRegisterBtn")
	.addEventListener("click", function () {
		document.getElementById("userRegisterModal").style.display = "block";
	});

// Функция для открытия всплывающего окна регистрации няни
document
	.getElementById("nannyRegisterBtn")
	.addEventListener("click", function () {
		document.getElementById("nannyRegisterModal").style.display = "block";
	});

// Функция для открытия всплывающего окна авторизации
document.getElementById("loginBtn").addEventListener("click", function () {
	document.getElementById("loginModal").style.display = "block";
});

// Функция для регистрации пользователя и сохранения данных в localStorage
function registerUser() {
	const username = document.getElementById("userUsername").value;
	const password = document.getElementById("userPassword").value;
	// Сохранение данных в localStorage (предполагается, что данные будут сохраняться безопасно)
	localStorage.setItem("userUsername", username);
	localStorage.setItem("userPassword", password);
	alert("Пользователь зарегистрирован.");
}

// Функция для регистрации няни и сохранения данных в localStorage
function registerNanny() {
	const username = document.getElementById("nannyUsername").value;
	const password = document.getElementById("nannyPassword").value;
	// Сохранение данных в localStorage (предполагается, что данные будут сохраняться безопасно)
	localStorage.setItem("nannyUsername", username);
	localStorage.setItem("nannyPassword", password);
	alert("Няня зарегистрирована.");
}

// Функция для авторизации пользователя или няни
function login() {
	const username = document.getElementById("loginUsername").value;
	const password = document.getElementById("loginPassword").value;
	// Проверка соответствия данных в localStorage
	const userStoredUsername = localStorage.getItem("userUsername");
	const userStoredPassword = localStorage.getItem("userPassword");
	const nannyStoredUsername = localStorage.getItem("nannyUsername");
	const nannyStoredPassword = localStorage.getItem("nannyPassword");

	if (username === userStoredUsername && password === userStoredPassword) {
		alert("Пользователь успешно авторизован.");
		window.location.href = "lkusers.html";

		// Здесь можно добавить переход на другую страницу после авторизации пользователя
	} else if (
		username === nannyStoredUsername &&
		password === nannyStoredPassword
	) {
		alert("Няня успешно авторизована.");
		window.location.href = "index_lkNann.html";
	} else {
		alert("Неверное имя пользователя или пароль.");
	}
}

// Функция для закрытия модального окна
function closeModal(modalId) {
	document.getElementById(modalId).style.display = "none";
	document.getElementById("overlay").style.display = "none";
}
function menuOnClick() {
	// Закрываем все модальные окна
	closeModal("userRegisterModal");
	closeModal("nannyRegisterModal");
	closeModal("loginModal");

	// Тогда вы можете добавить свой код для переключения меню
	document.getElementById("menu-bar").classList.toggle("change");
	document.getElementById("nav_registr").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}
