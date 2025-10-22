document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o mapa
    const map = L.map('map').setView([-14.2350, -51.9253], 4);
  
    // Tiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
  
    // Pontos de coleta no Brasil
    const locais = [
        { nome: "São Paulo - Centro", lat: -23.5505, lng: -46.6333, descricao: "Celulares, pilhas, eletrônicos pequenos" },
        { nome: "Rio de Janeiro - Copacabana", lat: -22.9711, lng: -43.1822, descricao: "Computadores e cabos" },
        { nome: "Belo Horizonte - Savassi", lat: -19.9305, lng: -43.9378, descricao: "Pilhas, baterias e acessórios" }
    ];
  
    // Cria um grupo de clusters
    const markers = L.markerClusterGroup();
  
    // Adiciona marcadores ao cluster
    locais.forEach(local => {
        const marker = L.marker([local.lat, local.lng])
            .bindPopup(`<b>${local.nome}</b><br>${local.descricao}`);
        markers.addLayer(marker);
    });
  
    map.addLayer(markers);
  });
  