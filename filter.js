const inputContainer = document.getElementById('inputContainer');
const select = document.getElementById('pet');
const form = document.forms.formFilter;
const buttonSearch = document.getElementById('btnFilter');
const buttonReset = document.getElementById('btnReboot');

function showOther() {
  if (select.value === "other") {
    inputContainer.style.display = 'block';
  } else {
    inputContainer.style.display = 'none';
  }
}

buttonReset.addEventListener('click', function () {
  let inputElements = document.querySelectorAll('input');
  select.value = "choose";
  inputContainer.style.display = 'none';
  inputElements.forEach(function (input) {
    input.value = input.defaultValue;
  });
})

buttonSearch.addEventListener('click', function () {
  let inputElements = document.querySelectorAll('input');
  select.value = "choose";
  inputContainer.style.display = 'none';
  inputElements.forEach(function (input) {
    input.value = input.defaultValue;
  });
})