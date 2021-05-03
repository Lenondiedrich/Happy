//cria mapa
const map = L.map("mapid").setView([-29.6536628,-50.580201], 15);

// cria e adiciona tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// criar icone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg", 
    iconSize: [58,68],
    iconAnchor: [29, 68],
});

let marker;

// criar e adicionar marcador
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remover icones
    marker && map.removeLayer(marker)

    // adicionar icon
    marker = L.marker([lat, lng], { icon })
    .addTo(map);
})

// adicionar campo de fotos
function addPhotoField() {
    // pegar o container de fotos #images
    const container = document.querySelector('#images')

    // pegar o container para duplicar
    const fieldsContainer = document.querySelectorAll('.new-upload')

    // realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    // verificar se o campo está vazio
    const input = newFieldContainer.children[0];

    if(input.value == "") {
        return 
    }

    // limpar o campo
    input.value = ""

    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

// botao de deletar
function deleteField(event, currentTarget) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove();
}

// selecionar sim e nao
function toggleSelect(event) {
    //remover class .active dos botoes
    document.querySelectorAll('.button-select button').forEach( button => button.classList.remove('active'))
    
    // colocar a class .active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    // verificar se sim ou nap

    input.value = button.dataset.value
}

function validate(event) {
    const lat = document.querySelector('[name="lat"]')
    const lng = document.querySelector('[name="lng"]')
    if(lat.value == "" && lng.value == "") {
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
}