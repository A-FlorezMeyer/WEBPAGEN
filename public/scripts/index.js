let status = 0;
var nav = L.map("nav");
var marker = null;
function getData() {
  $.ajax("/api/gps", {
    method: "GET",
    success: function (data) {
      // Establecer el color de fondo del elemento

      $("#latitud").text(data.latitud);
      $("#latitud").css(
        "color",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
      $("#longitud").text(data.longitud);
      $("#longitud").css(
        "color",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
      var fecha = new Date(data.timestamp); // Convertir el timestamp a milisegundos y crear un objeto Date
      var fechaLegible = fecha.toLocaleString();
      var fechas = fechaLegible.split(",");
      $("#hora").text(fechas[1]);
      $("#hora").css(
        "color",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
      $("#fecha").text(fechas[0]);
      $("#fecha").css(
        "color",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      $("#id").text(data.id);
      $("#id").css(
        "color",
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );

      let coords = [10.946897, -74.78476];
      if (status === 0) {
        //let coords=[Number(data.latitud), Number(data.longitud)]
        const map = nav.setView(coords, 17);

        // Crea una capa de mosaicos
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 20,
        }).addTo(map);
        // Crea un control de rutas y agrega la ruta al mapa
        var polyline = L.polyline(
          [
            [10.946897, -74.78476],
            [10.948984, -74.785322],
            [10.951071, -74.785948],
            [10.953526, -74.786635],
            [10.95592, -74.786198],
            [10.958375, -74.785197],
            [10.95948, -74.78626],
          ],
          {
            color: "red",
          }
        ).addTo(map);
        marker = L.marker(coords).addTo(nav);
        status = 1;
      } else {
        nav.setView(coords, 18);
        marker?.setLatLng(coords);
      }
    },
  });
}
// function getRandomInRange(from, to, fixed) {
// return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
//} //comentar para ecs

getData();
setInterval(() => {
  getData();
}, 6000);