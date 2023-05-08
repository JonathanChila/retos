const URL_GAMA = "http://localhost:8080/api/Gama/";
const tHeaders = ['NOMBRE', 'DESCRIPCIÓN'];

function getGamas() {
  //llamado ajax
  $.ajax({
    url: URL_GAMA + "all",
    type: "GET",
    dataType: "json",

    success: function (response) {
      showGamas(response); //"response.items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function saveGama() {
  let dataGama = {
    name: $("#name").val(),
    description: $("#description").val(),
  };

  //verifying that all items in the form are complete.
  if ( dataGama.name == '' || dataGama.description == '') {
    alert("No se registra dato, porque el formulario esta incompleto");
    return;
  }

  $.ajax({
    url: URL_GAMA + "save",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataGama),
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
  $("#description").val('');
}

function showGamas(data) {
    let idTableHtml = 'gamas_table';
    let htmlCode = "";
    //create the header's table
    htmlCode += " <thead><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>EDITAR</th>" +
            "<th>ELIMINAR</th>"  +
            "</tr></thead> ";
        
  //fill the table's body with data from DB
  htmlCode += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    htmlCode += "<tr class='centrar'>";
    htmlCode += "<td>" + data[i].name + "</td>";
    htmlCode += "<td>" + data[i].description + "</td>";
    htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].idGama + ",\"Gama\",tHeaders)'>" + "Consultar-Editar" + "</a></td>";
    htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].idGama + ",\"Gama\")'>" + "Eliminar" + "</a></td>";
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
    url: URL_GAMA + id.toString(),
    type: "DELETE",
    success: function (response) {
      //alert('Registro Eliminado');
      getGamas();
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}