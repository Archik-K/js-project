// Получение элементов формы и блоков данных
const dataEntryForm = document.querySelector(".data-entry__container");
const dataSavedBlock = document.querySelector(".lk-users__data-saved");
const editButton = document.querySelector(".data-saved__button");

// Проверка наличия сохраненных данных в Local Storage
let savedData = JSON.parse(localStorage.getItem("userData"));

// Функция для отображения сохраненных данных
function showSavedData() {
	if (savedData) {
		dataSavedBlock.style.display = "block";
		dataSavedBlock.querySelector(".data-saved__fullName").textContent =
			savedData.fullName;
		//dataSavedBlock.querySelector(".data-saved__petType").textContent =
			savedData.petType;
		//dataSavedBlock.querySelector(".data-saved__petName").textContent =
			savedData.petName;
		dataSavedBlock.querySelector(".data-saved__city").textContent =
			savedData.city;
		dataSavedBlock.querySelector(".data-saved__userContacts").textContent =
			savedData.phoneNumber;
		dataSavedBlock.querySelector(".data-saved__about").textContent =
			savedData.about;

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
	//const petType = document.getElementById("data-entry__petType").value;
	//const petName = document.getElementById("data-entry__petName").value;
	const city = document.getElementById("data-entry__city").value;
	const phoneNumber = document.getElementById("data-entry__phoneNumber").value;
	const about = document.getElementById("data-entry__about").value;

	const userData = {
		fullName,
		//petType,
		//petName,
		city,
		phoneNumber,
		about,
	};

	const imageFile = document.getElementById("data-entry__image").files[0];
	if (imageFile) {
		const reader = new FileReader();
		reader.onload = function (event) {
			userData.image = event.target.result;
			savedData.image = event.target.result;
			localStorage.setItem("userData", JSON.stringify(savedData));
		};
		reader.readAsDataURL(imageFile);
	}

	savedData = userData;
	localStorage.setItem("userData", JSON.stringify(userData));
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
	document.getElementById("data-entry__fullName").value = savedData.fullName;
	//document.getElementById("data-entry__petType").value = savedData.petType;
	//document.getElementById("data-entry__petName").value = savedData.petName;
	document.getElementById("data-entry__city").value = savedData.city;
	document.getElementById("data-entry__phoneNumber").value =
		savedData.phoneNumber;
	document.getElementById("data-entry__about").value = savedData.about;
	document.getElementById("data-entry__image").value = "";
}

// Добавление обработчика события отправки формы
dataEntryForm.addEventListener("submit", handleSubmit);

// Добавление обработчика события нажатия кнопки "Редактировать"
editButton.addEventListener("click", handleEdit);

// Проверка сохраненных данных при загрузке страницы
window.addEventListener("DOMContentLoaded", function () {
	showSavedData();
});

//Новый блок
//Новый блок
//Новый блок
//Новый блок

const addButton = document.getElementById('add-button');
const petForm = document.getElementById('pet-form');
const closeBtn = document.getElementById('close-btn');
const saveButton = document.getElementById('save-button');
const deleteButton = document.getElementById('delete-button');
const petImageInput = document.getElementById('pet-image-input');
const petType = document.getElementById('pet-type');
const petAge = document.getElementById('pet-age');
const petCards = document.getElementById('pet-cards');

addButton.addEventListener('click', () => {
  petForm.style.display = 'block';
  saveButton.disabled = true;
  deleteButton.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  petForm.style.display = 'none';
});

petImageInput.addEventListener('change', () => {
  saveButton.disabled = false;
});

saveButton.addEventListener('click', () => {
  const petImage = petImageInput.files[0] || { name: 'pet.png' };
  const petName = document.getElementById('pet-name').value || 'Unknown Pet';
  const petGender = document.querySelector('input[name="gender"]:checked').value;
  const petAgeValue = petAge.value;

  // Сохранение в local storage
  const petData = {
    petName,
    petGender,
    petAgeValue,
    petImage: petImage.name,
  };
  localStorage.setItem('petData', JSON.stringify(petData));

  // Создание карточки питомца
  const petCard = document.createElement('div');
  petCard.className = 'pet-card';

  const petImageElement = document.createElement('img');
  petImageElement.src = petImage.name === 'pet.png' ? './src/pet.png' : URL.createObjectURL(petImage);
  petImageElement.alt = petName;
  petImageElement.id = 'pet-image';

  const petInfo = document.createElement('div');
  petInfo.id = 'pet-info';
  petInfo.innerHTML = `
    <p><strong>Имя:</strong> ${petName}</p>
    <p><strong>Тип питомца:</strong> ${petType.value}</p>
    <p><strong>Возраст:</strong> ${petAgeValue}</p>
  `;

  petCard.appendChild(petImageElement);
  petCard.appendChild(petInfo);

  petCards.appendChild(petCard);

  // Очищаем форму
  petForm.style.display = 'none';
  petImageInput.value = '';
  petType.value = '';
  petAge.value = '';
  saveButton.disabled = true;
});

petCards.addEventListener('click', (event) => {
  const petCard = event.target.closest('.pet-card');
  if (petCard) {
    openEditForm(petCard);
  }
});

function openEditForm(petCard) {
  const petImageElement = petCard.querySelector('#pet-image');
  const petName = petCard.querySelector('p:nth-child(1)').textContent;
  const petTypeValue = petCard.querySelector('p:nth-child(2)').textContent;
  const petAgeValue = petCard.querySelector('p:nth-child(3)').textContent;

  petForm.style.display = 'block';
  saveButton.disabled = false;
  deleteButton.style.display = 'block';

  document.getElementById('pet-name').value = petName;
  document.getElementById('pet-type').value = petTypeValue;
  document.getElementById('pet-age').value = petAgeValue;

  saveButton.addEventListener('click', () => {
    // Обновляем данные питомца
    petImageElement.src = petImageInput.files[0] ? URL.createObjectURL(petImageInput.files[0]) : petImageElement.src;
    petImageElement.alt = document.getElementById('pet-name').value;
    petName.textContent = document.getElementById('pet-name').value;
    petType.textContent = `Тип животного: ${petType.value}`;
    petAge.textContent = `Возраст: ${petAge.value}`;

    // Очищаем форму
    petForm.style.display = 'none';
    petImageInput.value = '';
    petType.value = '';
    petAge.value = '';
    saveButton.disabled = true;
  });

  deleteButton.addEventListener('click', () => {
    // Удаляем карточку питомца
    petCard.remove();

    // Очищаем форму
    petForm.style.display = 'none';
    petImageInput.value = '';
    petType.value = 'Кошка';
    petAge.value = '';
    saveButton.disabled = true;
  });
}

