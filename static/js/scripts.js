var viewer = OpenSeadragon({
  id: "openseadragon1",
  prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
  tileSources: "/static/images/PIA03653.dzi",
  showNavigator: true
});

// Cargar POIs desde JSON
fetch("/static/data/pois.json")
  .then(response => response.json())
  .then(pois => {
    viewer.addHandler("open", function() {
      pois.forEach(function(poi) {
        // Coordenadas de la imagen
        var point = viewer.viewport.imageToViewportCoordinates(poi.x, poi.y);

        // Crear marcador
        var marker = document.createElement("div");
        marker.className = "poi-marker";
        marker.title = poi.name;

        marker.addEventListener("click", function() {
          // Mostrar info en alerta (puedes cambiarlo por panel)
          alert(`${poi.name}\n${poi.info}`);
        });

        viewer.addOverlay({
          element: marker,
          location: point,
          placement: OpenSeadragon.Placement.CENTER
        });

        // Crear tarjeta en el menú
        var cardContainer = document.getElementById("menu-cards");
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h2>${poi.name}</h2><p>${poi.info}</p>`;
        cardContainer.appendChild(card);
      });
    });
  })
  .catch(err => console.error("Error cargando POIs:", err));
