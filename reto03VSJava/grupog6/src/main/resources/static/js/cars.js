const URL_CAR = "http://150.136.169.53:8080/api/Car/";
const URL_GAMA = "http://150.136.169.53:8080/api/Gama/";
const tHeaders = ['NOMBRE', 'MARCA', 'MODELO', 'DESCRIPCIÓN', 'CATEGORIA' ];

function getCars() {
  //llamado ajax
  $.ajax({
    url: URL_CAR + "all",
    type: "GET",
    dataType: "json",

    success: function (response) {
      showCars(response); //"response.items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function saveCar() {
  let dataCar = {
    name: $("#name").val(),
    brand: $("#brand").val(),
    year: $("#yearCar").val(),
    description: $("#description").val(),
    gama: {idGama: parseInt($("#gamas_selector").val())}
  };

  //verifying that all items in the form are complete.
  if ( dataCar.id == '' || dataCar.brand == '' || dataCar.year == '' || dataCar.description == '' 
          || dataCar.gama.idGama == 0) {
    alert("No se registra dato, porque el formulario esta incompleto o incorrecto");
    return;
  }

  $.ajax({
    url: URL_CAR + 'save',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataCar),
    success: function (response) {
      alert("Se ha agregado un nuevo registro");
      cleanData();
    },
    error: function (response, xhr) {
      alert("No se ha agregado los datos");
    },
    complete: function (xhr, status) {
      // location.href = "./menuMain.html";
    },
  });
}

//function used to clean data of the textbox
function cleanData(){
  $("#name").val('');
  $("#brand").val('');
  $("#yearCar").val('');
  $("#description").val('');
}

function showCars(data) {
    let idTableHtml = 'cars_table';
    let htmlCode = "";
    //create the header's table
    htmlCode += " <thead><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>EDITAR</th><th>ELIMINAR</th></tr></thead> ";
        
  //fill the table's body with data from oracle DB
  htmlCode += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    htmlCode += "<tr class='centrar'>";
    htmlCode += "<td>" + data[i].name + "</td>";
    htmlCode += "<td>" + data[i].brand + "</td>";
    htmlCode += "<td>" + data[i].year + "</td>";
    htmlCode += "<td>" + data[i].description + "</td>";
    htmlCode += "<td>" + (data[i].gama==null?'No registra':data[i].gama.name) + "</td>";
    htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].idCar + ",\"Car\",tHeaders)'>" + "Consultar-Editar" + "</a></td>";
    htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].idCar + ",\"Car\")'>" + "Eliminar" + "</a></td>";
    htmlCode += "</tr>";
  }
  htmlCode += "</tbody>";

  //erase the table with old data and put new data 
  $("#" + idTableHtml).html("");
  $("#" + idTableHtml).empty();
  $("#" + idTableHtml).append(htmlCode);
}

function deleteData(id, tableType){
  $.ajax({
    url: URL_CAR + id.toString(),
    type: "DELETE",
    success: function (response) {
      //alert('Registro Eliminado');
      getCars();
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}


//------------------------------------------------------------------------------
// the next functions are used to get the gamas aviable into the SELECTOR
function getGamas() {
  //llamado ajax
  $.ajax({
    url: URL_GAMA + "all",
    type: "GET",
    dataType: "json",

    success: function (response) {
      showGamas(response); //".items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function showGamas(data) {
  let idSelector = 'gamas_selector';
  let htmlCode = '';

  // fill the selector with gamas in the BD
  htmlCode += '<option value=0>Seleccione una opcion</option>'
  for (let i = 0; i < data.length; i++) {
    htmlCode += '<option value="' + data[i].idGama + '">' + data[i].name + '</option>';
  }
  $('#' + idSelector).html(htmlCode);
}
//-----------------------------------------------------------------------------