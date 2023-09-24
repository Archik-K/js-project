const input = document.querySelector(".nickname"); // получаем элемент ввода ника
const textarea = document.querySelector(".textarea"); // получаем элемент ввода текста отзыва
const button = document.querySelector(".btn--submit3"); // получаем кнопку добавления отзыва
const reviewsList = document.querySelector(".list_of_reviews"); // получаем элемент списка отзывов (div)

let reviews = []; // создаем пустой массив для хранения отзывов

// Загрузка отзывов из Local Storage при загрузке страницы
if (window.localStorage.getItem("reviews")) {
    reviews = JSON.parse(window.localStorage.getItem("reviews"));
}

// Функция сохранения отзывов в Local Storage
function saveReviewsToLocalStorage() {
    window.localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Функция добавления отзыва в список
function addReview() {
    const nickname = input.value; // получаем значение из поля ввода ника и сохраняем его в переменной nickname
    const review = textarea.value; // получаем значение из поля ввода отзыва и сохраняем его в переменной review
    let reviewObj = {}; // создаем пустой объект для хранения ника и текста отзыва
    reviewObj.nickname = nickname; // записываем в объект ник
    reviewObj.review = review; // записываем в объект текст отзыва

    reviews.push(reviewObj); // добавляем объект в массив
    input.value = ""; // очищаем поле ввода ника
    textarea.value = ""; // очищаем поле ввода текста отзыва

    updateReviewList(); // обновляем список отзывов
    saveReviewsToLocalStorage();
}

// Функция обновления списка отзывов
function updateReviewList() {
    reviewsList.innerHTML = ""; // очищаем список отзывов

    // создаем карточки для каждого отзыва
    for (let i = 0; i < reviews.length; i++) {
        const newArticle = document.createElement("article"); // Создаем новый элемент article
        newArticle.classList.add("card"); //Добавляем класс в новый article
        const newDiv = document.createElement("div");
        newDiv.classList.add("card__content");
        const newPNickname = document.createElement("p");
        newPNickname.classList.add("review_nickname");
        const newPText = document.createElement("p");
        newPText.classList.add("review_text");

        const newReviewObj = reviews[i];
        const newReviewNickname = newReviewObj["nickname"];
        const newReviewText = newReviewObj.review;
        newPNickname.textContent = newReviewNickname; //Добавляем в значение p ник по ключу nickname из объекта в массиве
        newPText.textContent = newReviewText; //Добавляем в значение p текст отзыва по ключу review из объекта в массиве

        newDiv.append(newPNickname); //Добавляем элемент в новый div
        newDiv.append(newPText); //Добавляем элемент в новый div
        newArticle.append(newDiv); //Добавляем div в новый article
        reviewsList.append(newArticle); //Добавляем новый article в список отзывов
    }
}

// Обработчик клика на кнопку добавления отзыва
button.addEventListener("click", addReview);

// инициализация списка отзывов при загрузке страницы
updateReviewList();
