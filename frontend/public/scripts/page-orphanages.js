//cria mapa
const map = L.map("mapid").setView([-29.6536628, -50.580201], 15);

// cria e adiciona tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// criar icone
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function addMarker({ id, name, lat, lng }) {
  //criar popup overlay
  const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(
    `${name} <a href="orphanage?id=${id}"> <img src="/images/arrow-white.svg"></a>`
  );

  //cria e adiciona marker
  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}

const orphanageSpan = document.querySelectorAll(".orphanages span");
orphanageSpan.forEach((span) => {
  const orphanage = {
    id: span.dataset.id,
    name: span.dataset.name,
    lat: span.dataset.lat,
    lng: span.dataset.lng,
  };

  addMarker(orphanage);
});
