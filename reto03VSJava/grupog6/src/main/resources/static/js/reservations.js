const URL_RESERVATION = "http://141.148.20.35:8080/api/Reservation/";
const URL_CAR = "http://141.148.20.35:8080/api/Car/";
const URL_CLIENT = "http://141.148.20.35:8080/api/Client/";
const tHeaders = ["ID","ID CLIENTE","CLIENTE","CORREO", "VEHICULO","CALIFICIÓN","STATUS"];
var dataTemp;

function getReservations() {
  //llamado ajax
  $.ajax({
    url: URL_RESERVATION + "all",
    type: "GET",
    dataType: "json",

    success: function (response) {
      dataTemp = response;
      showReservations(response);
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function saveReservation() {
  let dataReservation = {
    startDate: $("#startDate").val(),
    devolutionDate: $("#devolutionDate").val(),
    client: { idClient: parseInt($("#clients_selector").val()) },
    car: { idCar: parseInt($("#cars_selector").val()) },
  };

  //verifying that all items in the form are complete.
  if (
    dataReservation.client.idClient == 0 ||
    dataReservation.car.idCar == 0 ||
    dataReservation.startDate == "" ||
    dataReservation.devolutionDate == ""
  ) {
    alert("No se registra dato, porque el formulario esta incompleto");
    return;
  }

  $.ajax({
    url: URL_RESERVATION + "save",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataReservation),
    success: function (response) {
      alert("Se ha agregado un nuevo registro");
      cleanData();
    },
    error: function (response, xhr) {
      alert("No se ha agregado los datos");
    },
    complete: function (xhr, status) {
      location.href = sessionStorage.getItem("thisUrl");
    },
  });
}

//function used to clean data of the textbox
function cleanData() {
  $("#messagetext").val("");
}


function showReservations(data) {
  let idTableHtml = 'reservations_table';
  let htmlCode = "";
  let optCar = parseInt($("#cars_selector").val());
  let optClient = parseInt($("#clients_selector").val());

  optCar = (isNaN(optCar))?0:optCar;
  optClient = (isNaN(optClient))?0:optClient;
  // console.log('optClient: ', optClient);
  // console.log('optCar: ', optCar);

  //create the header's table
  htmlCode += " <thead><tr>"
  tHeaders.forEach(element => {
      htmlCode += "<th>" + element + "</th>";
  });
  htmlCode += "<th>EDITAR</th><th>ELIMINAR</th></tr></thead> ";
      
  //fill the table's body with data from oracle DB
  htmlCode += "<tbody>";

  for (let i = 0; i < data.length; i++) {
    if(
      (optCar == 0 && optClient == 0) ||
      (optCar == data[i].car.idCar && optClient == 0) || 
      (optCar == 0 && optClient == data[i].client.idClient) ||  
      (optCar == data[i].car.idCar && optClient == data[i].client.idClient)
      ){
      htmlCode += "<tr class='centrar'>";
      htmlCode += "<td>" + data[i].idReservation + "</td>";
      htmlCode += "<td>" + data[i].client.idClient + "</td>";
      htmlCode += "<td>" + data[i].client.name + "</td>";
      htmlCode += "<td>" + data[i].client.email + "</td>";
      htmlCode += "<td>" + data[i].car.name + "</td>";
      htmlCode += "<td>" + ((data[i].score==null)?"No calificado":data[i].score.result) + "</td>";
      htmlCode += "<td>" + data[i].status + "</td>";
      htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].idReservation + ",\"Reservation\",tHeaders)'>" + "Consultar-Editar" + "</a></td>";
      htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].idReservation + ",\"Reservation\")'>" + "Eliminar" + "</a></td>";
      htmlCode += "</tr>";
    }
  }
  htmlCode += "</tbody>";

  //erase the table with old data and put new data 
  $("#" + idTableHtml).html("");
  $("#" + idTableHtml).empty();
  $("#" + idTableHtml).append(htmlCode);
}

function deleteData(id, tableType){
  let dataInfo = {
    'id': id
  };
  
  $.ajax({
    url: URL_RESERVATION + id.toString(),
    type: "DELETE",
    contentType: "application/json",
    data: JSON.stringify(dataInfo),
    success: function (response) {
      //alert('Registro Eliminado');
      getReservations();
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
// the next functions are used to get the CARS aviable into the SELECTOR
function getCars() {
  //llamado ajax
  $.ajax({
    url: URL_CAR + "all",
    type: "GET",
    dataType: "json",

    success: function (response) {
      showCars(response); //".items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function showCars(data) {
  let idSelector = "cars_selector";
  let htmlCode = "";

  // fill the selector with gamas in the BD
  htmlCode += "<option value=0>Seleccione un vehiculo</option>";
  for (let i = 0; i < data.length; i++) {
    htmlCode +=
      '<option value="' + data[i].idCar + '">' + data[i].name + "</option>";
  }
  $("#" + idSelector).html(htmlCode);
}
//-----------------------------------------------------------------------------

//------------------------------------------------------------------------------
// the next functions are used to get the CLIENTS aviable into the SELECTOR
function getClients() {
  let profile = sessionStorage.getItem("rol");
  if (profile == "Admin") {
    $.ajax({
      url: URL_CLIENT + "all",
      type: "GET",
      dataType: "json",

      success: function (response) {
        showClients(response); //".items" has been deleted 'cause it doesn't work forward
      },
      error: function (xhr, status) {
        // alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  } else {
    let idUser = parseInt(sessionStorage.getItem("idUser"));
    $.ajax({
      url: URL_CLIENT + idUser,
      type: "GET",
      dataType: "json",

      success: function (response) {
        showClients(response); //".items" has been deleted 'cause it doesn't work forward
      },
      error: function (xhr, status) {
        // alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }
}

function showClients(data) {
  let profile = sessionStorage.getItem("rol");
  let idSelector = "clients_selector";
  let htmlCode = "";

  // fill the selector with gamas in the BD
  if (profile == "Admin") {
    htmlCode += "<option value=0>Seleccione un cliente</option>";
    for (let i = 0; i < data.length; i++) {
      htmlCode +=
        '<option value="' +
        data[i].idClient +
        '">' +
        data[i].name +
        "</option>";
    }
  } else {
    htmlCode +=
      '<option value="' + data.idClient + '">' + data.name + "</option>";
    $("#" + idSelector).prop("disabled", true);
  }
  $("#" + idSelector).html(htmlCode);
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//catches the events date type inputs from document in order to that the start date is less than the end date
$(document).ready(function() {
  $('#startDate').on('change', function() {
    let startDate = new Date($(this).val());
    let devolutionDate = new Date($('#devolutionDate').val());
    if (startDate > devolutionDate) {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin');
      $(this).val('');
    }
  });
  
  $('#devolutionDate').on('change', function() {
    let devolutionDate = new Date($(this).val());
    let startDate = new Date($('#startDate').val());
    if (startDate > devolutionDate) {
      alert('La fecha de fin no puede ser menor que la fecha de inicio');
      $(this).val('');
    }
  });
});
//-----------------------------------------------------------------------------