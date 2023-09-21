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

// Используем запрос к сервису Google Geocoding для получения координат по адресу
axios
	.get("https://maps.googleapis.com/maps/api/geocode/json", {
		params: {
			address: "Москва, Мамоновский пер., 4, стр. 1",
			key: "YOUR_API_KEY",
		},
	})
	.then((response) => {
		if (response.data.results.length > 0) {
			const { lat, lng } = response.data.results[0].geometry.location;
			// Создаем карту и маркер с полученными координатами
			let map = L.map("map").setView([lat, lng], 13);
			let marker = L.marker([lat, lng]).addTo(map);
			marker.bindPopup(
				"Всемирная организация здравоохранения животных, региональное представительство Мэб в Москве. Мамоновский пер., 4, стр. 1, Москва"
			);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);
		} else {
			console.error("Адрес не найден");
		}
	})
	.catch((error) => {
		console.error(error);
	});
