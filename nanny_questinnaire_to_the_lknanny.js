
document.addEventListener("DOMContentLoaded", function () {
    // Найдите кнопку "Отправить" по ее ID
    let submitButton = document.getElementById(
        "sending_a_babysitter_questionnaire"
    );

    // Добавьте обработчик события для клика по кнопке
    submitButton.addEventListener("click", function () {
        saveDataToLocalStorage();
    });

    // При загрузке страницы проверка на наличие сохраненных данных в LocalStorage

    let savedData = localStorage.getItem("nannyDataQ");
    if (savedData) {

        alert("С указанными данными уже зарегистрирован пользователь. Авторизуйтесь для входа в Личный кабинет");
        // предложить авторизоваться для перехода в Личный кабинет


    }


});

// Функция для сохранения данных в Local Storage
function saveDataToLocalStorage() {
    const fullName = document.getElementById("nameForm").value;
    const city = document.getElementById("citiForm").value;
    const petType = getCheckedPets();
    const phoneNumber = document.getElementById("phoneForm").value;
    const connection = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("emailForm").value;
    const birthday = document.getElementById("birthday").value;
    const workExperience = document.getElementById("workExperience").value;
    const minSalary = document.getElementById("minSalary").value;
    const maxSalary = document.getElementById("maxSalary").value;
    const format = document.querySelector('input[name="level"]:checked').value;
    const extra = document.getElementById("commentsForm2").value;
    //const idNanny;
    //if (savedData && savedData.idNanny =="") {
    //	idNanny = `N_${dateRegistration}_${fullName.slice(0, fullName.indexOf(' '))}_${birthday}`;
    //} 


    const nannyDataQ = {
        fullName,
        city,
        petType,
        phoneNumber,
        connection,
        username,
        email,
        birthday,
        workExperience,
        minSalary,
        maxSalary,
        format,
        extra,
        //idNanny,
    };

    savedData = nannyDataQ;
    localStorage.setItem("nannyDataQ", JSON.stringify(nannyDataQ));
}


// Функция для получения выбранных типов животных
function getCheckedPets() {
    const checkboxes = document.getElementsByClassName("checkPets");
    const checkedPets = [];
    for (let index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkedPets.push(checkboxes[index].id);
        }
    }
    return checkedPets;
}


