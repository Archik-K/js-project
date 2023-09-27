// Получение элементов формы и блоков данных
const dataEntryForm = document.querySelector(".data-entry__container");
const dataSavedBlock = document.querySelector(".lk-nanny__data-saved");
const editButton = document.querySelector(".data-saved__button");

// Проверка наличия сохраненных данных в Local Storage - зарегистрированный пользователь
let savedData = JSON.parse(localStorage.getItem("nannyData"));

// Проверка наличия данных перенесённых из заявки
let savedDataQ = JSON.parse(localStorage.getItem("nannyDataQ"));

// Функция для отображения сохраненных данных
function showSavedData() {
	if (savedData) {
		dataSavedBlock.style.display = "block";
		//dataSavedBlock.querySelector(".data-saved__idNanny").textContent = savedData.idNanny;
		dataSavedBlock.querySelector(".data-saved__fullName").textContent = savedData.fullName;
		dataSavedBlock.querySelector(".data-saved__birthday").textContent =
			savedData.birthday;
		dataSavedBlock.querySelector(".data-saved__workExperience").textContent =
			savedData.workExperienceText;
		dataSavedBlock.querySelector(".data-saved__petType").textContent =
			savedData.petType;
		dataSavedBlock.querySelector(".data-saved__city").textContent =
			savedData.city;
		dataSavedBlock.querySelector(".data-saved__nannyContacts").textContent =
			savedData.phoneNumber;
		dataSavedBlock.querySelector(".data-saved__connection").textContent =
			savedData.connection;
		dataSavedBlock.querySelector(".data-saved__username").textContent =
			savedData.username;
		dataSavedBlock.querySelector(".data-saved__email").textContent =
			savedData.email;
		dataSavedBlock.querySelector(".data-saved__CardSalary").textContent =
			`от ${savedData.minSalary} до ${savedData.maxSalary} руб.`;
		dataSavedBlock.querySelector(".data-saved__workFormat").textContent =
			savedData.format;
		dataSavedBlock.querySelector(".data-saved__extra").textContent =
			savedData.extra;
		dataSavedBlock.querySelector(".data-saved__dateRegistration").textContent =
			savedData.dateRegistration;

		if (savedData.image) {
			const imageElement = dataSavedBlock.querySelector(".data-saved__photo");
			imageElement.src = savedData.image;
			imageElement.style.display = "block";
		}

		// Скрытие блока ввода данных
		dataEntryForm.style.display = "none";
	} else {
		// Отображение блока ввода данных при первом входе
		dataEntryForm.style.display = "block";
		dataSavedBlock.style.display = "none";
	}
}

// Функция для сохранения данных в Local Storage
function saveDataToLocalStorage() {

	const fullName = document.getElementById("data-entry__fullName").value;
	const birthday = document.getElementById("data-entry__birthday").value;
	const workExperience = document.getElementById("data-entry__workExperience").value;
	const workExperienceText = checkOption();
	const petType = getCheckedPets();
	const city = document.getElementById("data-entry__city").value;
	const phoneNumber = document.getElementById("data-entry__phoneNumber").value;
	const connection = document.querySelector('input[name="flexRadioDefault"]:checked').value;
	const username = document.getElementById("data-entry__username").value;
	const email = document.getElementById("data-entry__emailForm").value;
	const minSalary = document.getElementById("data-entry__minSalary").value;
	const maxSalary = document.getElementById("data-entry__maxSalary").value;
	const format = document.querySelector('input[name="level"]:checked').value;
	const extra = document.getElementById("data-entry__extra").value;
	const dateRegistration = document.getElementById("data-entry__dateRegistration").value;



	//const idNanny;
	//if (savedData && savedData.idNanny =="") {
	//	idNanny = `N_${dateRegistration}_${fullName.slice(0, fullName.indexOf(' '))}_${birthday}`;
	//} 



	const nannyData = {
		fullName,
		birthday,
		workExperience,
		workExperienceText,
		petType,
		city,
		phoneNumber,
		connection,
		username,
		email,
		minSalary,
		maxSalary,
		format,
		extra,
		//idNanny,
		dateRegistration,
	};

	const imageFile = document.getElementById("data-entry__image").files[0];
	if (imageFile) {
		const reader = new FileReader();
		reader.onload = function (event) {
			nannyData.image = event.target.result;
			savedData.image = event.target.result;
			localStorage.setItem("nannyData", JSON.stringify(savedData));
		};
		reader.readAsDataURL(imageFile);
	}

	savedData = nannyData;
	localStorage.setItem("nannyData", JSON.stringify(nannyData));
}

// Функция для обработки события отправки формы
function handleSubmit(event) {
	event.preventDefault();

	// Валидация полей формы
	if (!dataEntryForm.checkValidity()) {
		dataEntryForm.reportValidity();
		return;
	}

	// Сохранение данных в Local Storage
	saveDataToLocalStorage();

	// Скрытие блока ввода данных и отображение блока сохраненных данных
	dataEntryForm.style.display = "none";
	showSavedData();
}

// Функция для обработки события нажатия кнопки "Редактировать"
function handleEdit() {
	// Отображение блока ввода данных и скрытие блока сохраненных данных
	dataEntryForm.style.display = "block";
	dataSavedBlock.style.display = "none";

	// Заполнение полей формы сохраненными данными
	//document.getElementById("data-entry__idNanny").value = savedData.idNanny;
	document.getElementById("data-entry__fullName").value = savedData.fullName;
	document.getElementById("data-entry__birthday").value = savedData.birthday;
	document.getElementById("data-entry__workExperience").value = savedData.workExperience;
	document.getElementById("data-entry__city").value = savedData.city;
	document.getElementById("data-entry__phoneNumber").value = savedData.phoneNumber;
	document.getElementById("data-entry__username").value = savedData.username;
	document.getElementById("data-entry__emailForm").value = savedData.email;
	document.getElementById("data-entry__minSalary").value = savedData.minSalary;
	document.getElementById("data-entry__maxSalary").value = savedData.maxSalary;
	document.getElementById("data-entry__extra").value = savedData.extra;
	document.getElementById("data-entry__dateRegistration").value = savedData.dateRegistration;

	// заполняем выбранный способ связи
	checkConnection();

	// заполняем выбранный формат
	checkWorkFormat();

	// заполняем выбранные типы животных
	unpackCheckedPets();

	//document.getElementById("data-entry__image").value = "";
}

// Добавление обработчика события отправки формы
dataEntryForm.addEventListener("submit", handleSubmit);

// Добавление обработчика события нажатия кнопки "Редактировать"
editButton.addEventListener("click", handleEdit);

// Проверка сохраненных данных при загрузке страницы
window.addEventListener("DOMContentLoaded", function () {
	document.getElementById("data-entry__dateRegistration").valueAsDate = new Date();
	showSavedData();
});

// Функция для получения выбранных типов животных
function getCheckedPets() {
	const checkboxes = document.getElementsByClassName("checkPets");
	const checkedPets = [];
	for (let index = 0; index < checkboxes.length; index++) {
		if (checkboxes[index].checked) {
			checkedPets.push(checkboxes[index].value);
		}
	}
	return checkedPets;
}

// Функция для отображения в чекбоксах выбранных типов животных
function unpackCheckedPets() {
	const checkboxesPets = document.getElementsByClassName("checkPets");
	const savedPets = savedData.petType;
	for (oneCheck of checkboxesPets) {
		for (onePet of savedPets) {
			if (oneCheck.value == onePet) {
				oneCheck.checked = true;
			}
		}
	}
}

// Функция для отображения выбранного формата работы
function checkWorkFormat() {
	const inputsFormat = document.getElementsByClassName("form-check-input");
	for (oneinput of inputsFormat) {
		if (oneinput.value == savedData.format) {
			oneinput.checked = true;
			break;
		}
	}
}

// Функция для отображения выбранного способа связи
function checkConnection() {
	const checkedConnection = document.getElementsByClassName("flexRadioDefault");
	for (oneCheck of checkedConnection) {
		if (oneCheck.value == savedData.connection) {
			oneCheck.checked = true;
			break;
		}
	}
}

// Функция для получения текста формата работы
function checkOption() {
	const formatOptions = document.getElementById("data-entry__workExperience");
	if (formatOptions[1].selected == true) {
		return "Менее года";
	}
	else if (formatOptions[2].selected == true) {
		return "От 1 до 3 лет";
	}
	else if (formatOptions[3].selected == true) {
		return "От 3 до 6 лет";
	}
	else if (formatOptions[4].selected == true) {
		return "Более 6 лет";
	}
	else {
		return "Не указан";
	}
}

