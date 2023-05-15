const URL_ADMIN = 'http://150.136.169.53:8080/api/Admin/'
const tHeaders = ['NOMBRE', 'CORREO'];

function getAdmins() {
    $.ajax({
      url: URL_ADMIN + 'all',
      type: "GET",
      dataType: "json",
  
      success: function (response) {
        showAdmins(response); //"response.items" has been deleted 'cause it doesn't work forward
      },
      error: function (xhr, status) {
        alert("ha sucedido un problema");
      },
      complete: function (xhr, status) {
        //   alert("Petición realizada");
      },
    });
  }
  
  function saveAdmin() {
    let dataAdmin = {
      name: $("#name").val(), 
      email: $("#email").val(),
      password: $("#password").val()
    };
  
    //verifying that all items in the form are complete.
    if ( dataAdmin.id == '' || dataAdmin.name == '' || dataAdmin.email == '') {
      alert("No se registra dato, porque el formulario esta incompleto");
      return;
    }
  
    $.ajax({
      url: URL_ADMIN + 'save',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(dataAdmin),
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
  function cleanData(){
    $("#name").val('');
    $("#email").val('');
    $("#password").val('');
  }
  
  function showAdmins(data) {
    idTableHtml = 'admins_table';
    let htmlCode = "";

    //create the header's table
    htmlCode += " <thead><tr>"
    tHeaders.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
    htmlCode += "<th>EDITAR</th>" +
            "<th>ELIMINAR</th>"  +
            "</tr></thead> ";
        
  //fill the table's body with data from oracle DB
  htmlCode += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    htmlCode += "<tr class='centrar'>";
    htmlCode += "<td>" + data[i].name + "</td>";
    htmlCode += "<td>" + data[i].email + "</td>";
    htmlCode += "<td><a href='#' onclick='dataStorageSession(" + data[i].idAdmin + ",\"Admin\",tHeaders)'>Consultar-Editar</a></td>";
    htmlCode += "<td><a href='#' onclick='deleteData(" + data[i].idAdmin + ",\"Admin\")'>Eliminar</a></td>";
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
    url: URL_ADMIN + id.toString(),
    type: "DELETE",
    success: function (response) {
      //alert('Registro Eliminado');
      getAdmins();
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}