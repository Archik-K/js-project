/* const button_babysitter = document.querySelector(
	"#sending_a_babysitter_questionnaire"
);
button_babysitter.addEventListener("click", function () {});
 */
document.addEventListener("DOMContentLoaded", function () {
	// Найдите кнопку "Отправить" по ее ID
	let submitButton = document.getElementById(
		"sending_a_babysitter_questionnaire"
	);

	// Добавьте обработчик события для клика по кнопке
	submitButton.addEventListener("click", function () {
		// Получите значения полей формы
		let name = document.getElementById("nameForm").value;
		let citi = document.getElementById("citiForm").value;
		let pet = document.getElementById("petForm2").value;
		let phone = document.getElementById("phoneForm").value;
		let email = document.getElementById("emailForm").value;
		let workExperience = document.getElementById("workExperience").value;
		let minSalary = document.getElementById("minSalary").value;
		let maxSalary = document.getElementById("maxSalary").value;
		let format = document.querySelector('input[name="level"]:checked').value;
		let comments = document.getElementById("commentsForm2").value;

		// Создайте объект для хранения данных
		let formData = {
			name: name,
			citi: citi,
			pet: pet,
			phone: phone,
			email: email,
			workExperience: workExperience,
			minSalary: minSalary,
			maxSalary: maxSalary,
			format: format,
			comments: comments,
		};

		// Сохраните данные в LocalStorage
		localStorage.setItem("formData", JSON.stringify(formData));

		// Создайте HTML-разметку с результатами
		let resultHTML = `
            <h3>Результаты заявки:</h3>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Район:</strong> ${citi}</p>
            <p><strong>Выбранное животное:</strong> ${pet}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Опыт работы:</strong> ${workExperience}</p>
            <p><strong>Зарплата:</strong> От ${minSalary} до ${maxSalary} рублей</p>
            <p><strong>Формат работы:</strong> ${format}</p>
            <p><strong>Дополнительная информация:</strong> ${comments}</p>
        `;

		// Вставьте результаты на страницу
		let resultContainer = document.getElementById("result");
		resultContainer.innerHTML = resultHTML;
	});

	// При загрузке страницы проверьте наличие сохраненных данных в LocalStorage
	let savedData = localStorage.getItem("formData");
	if (savedData) {
		let savedFormData = JSON.parse(savedData);

		// Выведите сохраненные данные на страницу
		document.getElementById("nameForm").value = savedFormData.name;
		document.getElementById("citiForm").value = savedFormData.citi;
		document.getElementById("petForm2").value = savedFormData.pet;
		document.getElementById("phoneForm").value = savedFormData.phone;
		document.getElementById("emailForm").value = savedFormData.email;
		document.getElementById("workExperience").value =
			savedFormData.workExperience;
		document.getElementById("minSalary").value = savedFormData.minSalary;
		document.getElementById("maxSalary").value = savedFormData.maxSalary;
		let selectedFormat = savedFormData.format;
		document.querySelector(
			'input[name="level"][value="' + selectedFormat + '"]'
		).checked = true;
		document.getElementById("commentsForm2").value = savedFormData.comments;
	}
});
