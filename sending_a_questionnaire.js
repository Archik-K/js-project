function sendDataToServer(data) {
	// Опции для POST-запроса
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	// Выполняем POST-запрос с помощью Fetch API
	fetch("http://localhost:5000/nanny", requestOptions)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Ошибка запроса: " + response.status);
			}
			return response.json();
		})
		.then((resultData) => {
			// Обработка успешного ответа сервера
			const resultElement = document.getElementById("result");
			resultElement.innerHTML = "Результат: " + resultData.message;
		})
		.catch((error) => {
			// Обработка ошибки
			console.error(error.message);
		});
}

// Обработчик события для кнопки "Отправить"
document
	.getElementById("sending_a_babysitter_questionnaire")
	.addEventListener("click", function () {
		// Получаем данные из формы
		const name = document.getElementById("nameForm").value;
		const image = document.querySelector(".image_nanny").files[0]; // Вам нужно обработать загрузку изображения вручную, если необходимо
		const selection = document.querySelector(".form-select").value;
		const phone = document.getElementById("phoneForm").value;
		const preferredContactMethod = document.getElementById("flexRadioDefault1")
			.checked
			? "Мобильная связь"
			: "Мессенджер";
		const username = document.querySelector(".input-group input").value;
		const email = document.getElementById("emailForm").value;
		const birthDate = document.querySelector('input[name="calendar"]').value;
		const additionalComments = document.getElementById("commentsForm").value;

		// Создаем объект для отправки данных
		const data = {
			name,
			image, // Вам нужно обработать загрузку изображения вручную, если необходимо
			selection,
			phone,
			preferredContactMethod,
			username,
			email,
			birthDate,
			additionalComments,
		};

		// Выполняем POST-запрос
		sendDataToServer(data);
	});


//Очистка заявки для няни
const inputContainerForm2 = document.getElementById("inputContainerForm2"); // Получение элемента с ID "inputContainerForm2" и сохранение его в переменную inputContainerForm
const selectForm2 = document.getElementById("petForm2"); // Получение элемента с ID "petForm2" (select) и сохранение его в переменную
const Form2 = document.forms.form2; // Получение формы с именем form2 и сохранение ее в переменную
const sending = document.getElementById("sending_a_babysitter_questionnaire"); // Получение кнопки с ID "sending_a_babysitter_questionnaire" и сохранение ее в переменную buttonSend
const commentsForm2 = document.getElementById("commentsForm2");  // Получение элемента с ID "commentsForm2" и сохранение его в переменную
const flexRadioDefault22 = document.getElementById("flexRadioDefault22"); // Получение элемента с ID "flexRadioDefault22" и сохранение его в переменную
const home2 = document.getElementById("home2"); // Получение элемента с ID "home2" и сохранение его в переменную
const workExperience = document.getElementById("workExperience"); // Получение элемента с ID "workExperience" и сохранение его в переменную

// Функция showOtherForm, которая изменяет стиль отображения inputContainerForm на основе выбранного значения в select в заявке на передержку
function showOtherForm2() {
	// Если выбранное значение (value) в select равно "other"
	if (selectForm2.value === "other") {
		// Показываем inputContainerForm2, задавая значение display стиля на "block"
		inputContainerForm2.style.display = "block";
	} else {
		// Скрываем inputContainerForm2, задавая значение display стиля на "none"
		inputContainerForm2.style.display = "none";
	}
}

// Добавляем обработчик события "click" на элемент sending
sending.addEventListener("click", function () {
	// Получение всех элементов, которые являются инпутами, и сохранение их в переменную inputElements
	let inputElements = document.querySelectorAll("input");
	// Устанавливаем значение selectForm на "choose"
	selectForm2.value = "choose";
	// Устанавливаем значение workExperience на "0"
	workExperience.value = '0';
	// Скрываем inputContainer2, задавая значение display стиля на "none"
	inputContainerForm2.style.display = "none";
	// Проходим по каждому найденному инпуту
	inputElements.forEach(function (input) {
		// Сбрасываем значение инпута до значения по умолчанию
		input.value = input.defaultValue;
		// Сбрасываем значения радиокнопок до значений по умолчанию
		flexRadioDefault22.checked = true;
		home2.checked = true;
		// Очищаем текстовое поле  
		commentsForm2.value = '';
	});
});