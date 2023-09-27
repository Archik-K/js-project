// Создаем карту, указываем элемент с идентификатором "map" для отображения, координаты центра [51.505, -0.09] и масштаб 13
let map = L.map("map").setView([55.765799, 37.597806], 13);

// Добавляем тайлы OpenStreetMap на карту, указываем их URL-шаблон, и отображаем атрибуции авторов
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map); // Добавляем созданный слой тайлов на карту

// Создаем маркер с координатами [51.5, -0.09] и добавляем его на карту
let customIcon = L.icon({
	iconUrl: "./src/pictures/logo_nav.png",
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

let marker = L.marker([55.765799, 37.597806], { icon: customIcon }).addTo(map);

let circle = L.circle([55.765799, 37.597806], {
	color: "red",
	fillColor: "#f03",
	fillOpacity: 0.5,
	radius: 15,
}).addTo(map);

// Привязываем всплывающее окно к маркеру с текстом
marker.bindPopup(
	"<b class='custom-popup'>Всемирная организация здравоохранения животных</b><br>" +
		"Региональное представительство МЭБ в Москве<br>" +
		"<p class='address'>Адрес: Мамоновский пер., 4, стр. 1, Москва</p>"
);
