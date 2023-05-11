const URL_INFO = 'http://141.148.20.35:8080/api/'
var arrayData = {};
var dataTemp;

function returnLastWebPage(){
    location.href = sessionStorage.getItem("thisUrl");
}

function dataStorageSession(id, tableType, tHeaders){
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("table_type",tableType);
    sessionStorage.setItem("thisUrl", window.location.href);
    sessionStorage.setItem("tHeaders", tHeaders);
    location.href = 'information.html';
}

function getDetail(){
    let id = sessionStorage.getItem("id");
    let tableType = sessionStorage.getItem("table_type");
    let tHeaders = sessionStorage.getItem("tHeaders").split(",");

    $.ajax({
        url: URL_INFO + tableType  + "/" + id,
        type: "GET",
        dataType: "json",
        success: function (response) {
          dataTemp = response;
          showDetails(response, tHeaders);
        },
        error: function (xhr, status) {
          // alert("ha sucedido un problema");
        },
        complete: function (xhr, status) {
          //   alert("Petición realizada");
        },
      });
}

function showDetails(dataInfo, tHeaders){
  let tableType = sessionStorage.getItem("table_type");
  let idTableHtml = 'detail_table';
  let htmlCode = "";
  arrayData = dataInfo;

  //create the content of the table
  htmlCode += (function(data,table){
    switch (table) {
      case 'Gama':
        return gamaTable(data);

      case 'Car':
        return carTable(data);

      case 'Client':
        return clientTable(data);

      case 'Message':
        return messageTable(data);

      case 'Reservation':        
        return reservationTable(data);

      case 'Admin':
        return adminTable(data);
    
      default:
        return '';
    }
  })(dataInfo,tableType);

//erase the table with old data and put new data 
$("#" + idTableHtml).html("");
$("#" + idTableHtml).empty();
$("#" + idTableHtml).append(htmlCode);
$('#status_selector').val(dataInfo.status); 

if(tableType == 'Reservation'){
  (dataInfo.score===null)?$('#score_selector').val(dataInfo.score):$('#score_selector').val(dataInfo.score.result);
}
}

//=================================================================================================================
// These functions return the values into the table depending on the specified case
function gamaTable(data){
  result = '';
  result += "<tr><td>NOMBRE</td><td><input id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><td>DESCRIPCIÓN</td><td><textarea id='description' cols='40' rows='4'>" + data.description + "</textarea></td></tr>";
  return result;
}

function carTable(data){
  result = '';
  result += "<tr><td>NOMBRE</td><td><input id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><td>MARCA</td><td><input id='brand' type='text' value='" + data.brand + "'></td></tr>";
  result += "<tr><td>AÑO-MODELO</td><td><input id='year' type='number' value='" + data.year + "'></td></tr>";
  result += "<tr><td>DESCRIPCIÓN</td><td><textarea id='description' cols='40' rows='4'>" + data.description + "</textarea></td></tr>";
  result += "<tr><td>GAMA</td><td>" + data.gama.name + "</td></tr>";
  return result;
}

function clientTable(data){
  result = '';
  result += "<tr><td>NOMBRE</td><td><input id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><td>CORREO</td><td>" + data.email + "</td></tr>";
  result += "<tr><td>CONTRASEÑA</td><td><input id='password' type='password'value='" + data.password + "'></td></tr>";
  result += "<tr><td>EDAD</td><td><input id='age' type='number'value='" + data.age + "'></td></tr>";
  return result;
}

function messageTable(data){
  result = '';
  result += "<tr><td>CLIENTE</td><td>" + data.client.name + "</td></tr>";
  result += "<tr><td>VEHICULO</td><td>" + data.car.name + "</td></tr>";
  result += "<tr><td>MENSAJE</td><td><textarea id='messagetext' cols='50' rows='10'>" + data.messageText + "</textarea></td></tr>";
  return result;
}

function reservationTable(data){
  result = '';
  result += "<tr><td>CLIENTE</td><td>" + data.client.name + "</td></tr>";
  result += "<tr><td>VEHICULO</td><td>" + data.car.name + "</td></tr>";
  result += "<tr><td>F. INICIO</td><td><input id='startDate' type='date' value='" + data.startDate.split('T')[0] + "'></td></tr>";
  result += "<tr><td>F. DEVOLUCIÓN</td><td><input id='devolutionDate' type='date' value='" + data.devolutionDate.split('T')[0] + "'></td></tr>";
  result += "<tr><td>STATUS</td><td>" + showStatus() + "</td></tr>";
  result += "<tr><td>CALIFICACIÓN</td><td>" + showScore() + "</td></tr>"; 
  result += "<tr><td>MENSAJE</td><td><textarea id='description' cols='50' rows='10' placeholder='dejanos tu opinion'>" + (data.score===null?"":data.score.description) + "</textarea></td></tr>";
  return result;
}



function adminTable(data){
  result = '';
  result += "<tr><td>NOMBRE</td><td><input id='name' type='text' value='" + data.name + "'></td></tr>";
  result += "<tr><td>CORREO</td><td>" + data.email + "</td></tr>";
  result += "<tr><td>CONTRASEÑA</td><td><input id='password' type='password'value='" + data.password + "'></td></tr>";
  return result;
}
//================================================================================================================

//------------------------------------------------------------------------------
// the next functions are used to get the SCORE aviable into the SELECTOR
function showScore() {
  let htmlCode = '';
  htmlCode += "<select id='score_selector' style='width: 180px;'>"
  htmlCode += "<option value=0>0 - Pésimo servicio</option>";
  htmlCode += "<option value=1>1 - malo pero aceptable</option>";
  htmlCode += "<option value=2>2 - regular pero aceptable</option>";
  htmlCode += "<option value=3>3 - neutral, ni bueno ni malo</option>";
  htmlCode += "<option value=4>4 - bueno, me convenció</option>";
  htmlCode += "<option value=5>5 - excelente servicio</option>";
  htmlCode += "<option value=''>Califique nuestro servicio</option>";
  htmlCode += "</select>";
 return htmlCode;
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// the next functions are used to get the STATUS aviable into the SELECTOR
function showStatus() {
  let htmlCode = '';
  htmlCode += "<select id='status_selector' style='width: 180px;'>"
  htmlCode += "<option value='created'>created</option>";
  htmlCode += "<option value='completed'>completed</option>";
  htmlCode += "<option value='cancelled'>cancelled</option>";
  htmlCode += "</select>";
 return htmlCode;
}
//------------------------------------------------------------------------------

function updateData(tableType){
  if(tableType == 'Reservation'){
    if(!checkDateRangeValidity()) {return;}
  }

  let dataInfo = (function(data,table){
    switch (table) {
      case 'Gama':
        return gamaDataUpdate(data);

      case 'Car':
        return carDataUpdate(data);

      case 'Client':
        return clientDataUpdate(data);

      case 'Message':
        return messageDataUpdate(data);

      case 'Reservation':        
        return reservationDataUpdate(data);

      case 'Score':
        return scoreDataUpdate(data);

      case 'Admin':
        return adminDataUpdate(data);
    
      default:
        return '';
    }
  })(dataTemp,tableType);

  
  $.ajax({
    url: URL_INFO + tableType + "/update",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(dataInfo),
    success: function (response) {
      if(tableType == 'Reservation'){
        if(dataTemp.score === null){
          saveScore();
          alert('Registro Actualizado');
        } else {
          updateData('Score');
          alert('Registro Actualizado');
        }
      } else {
        alert('Registro Actualizado');
      }
    },
    error: function (xhr, status) {
      alert("ha sucedido un problema");
    },
    complete: function (xhr, status) {
      location.href = sessionStorage.getItem("thisUrl");
    },
  });

}

//=================================================================================================================
// These functions return the values into the table depending on the specified case
function gamaDataUpdate(data){
  return {
    idGama: data.idGama,
    name: $('#name').val(),
    description: $('#description').val()
  };
}

function carDataUpdate(data){
  return {
    idCar: data.idCar,
    name: $('#name').val(),
    brand: $('#brand').val(),
    year: $('#year').val(),
    description: $('#description').val()
  }
}

function clientDataUpdate(data){
  return {
    idClient: data.idClient,
    name: $('#name').val(),
    email: data.email,
    password: $('#password').val(),
    age: $('#age').val()
  }
}

function messageDataUpdate(data){
  return {
    idMessage: data.idMessage,
    messageText: $('#messagetext').val(),
    client:{idClient: data.client.idClient},
    car:{idCar: data.car.idCar}
  }
}

function reservationDataUpdate(data){
  return {
    idReservation: data.idReservation,
    client:{idClient: data.client.idClient},
    car:{idCar: data.car.idCar},
    startDate: $('#startDate').val(),
    devolutionDate: $('#devolutionDate').val(),
    status: $('#status_selector').val(),
  }
}

function scoreDataUpdate(data){
  return {
    idScore:data.score.idScore,
    result:parseInt($('#score_selector').val()),
    description:$('#description').val(),
    reservation: {idReservation:data.idReservation},
  }
}

function saveScore() {
  let dataScore = {
    result:parseInt($('#score_selector').val()),
    description:$('#description').val(),
    reservation: {idReservation:dataTemp.idReservation},
  };

  //verifying that all items in the form are complete.
  if (dataScore.result === null) {
    return;
  }

  $.ajax({
    url: URL_INFO + "Score/save",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataScore),
    success: function (response) {
      // alert("Se ha agregado un nuevo registro");
    },
    error: function (response, xhr) {
      alert("No se ha agregado los datos");
    },
    complete: function (xhr, status) {
    },
  });
}

function adminDataUpdate(data){
  return {
    idAdmin: data.idAdmin,
    name: $('#name').val(),
    email: data.email,
    password: $('#password').val(),
  }
}

//=================================================================================================================

//-----------------------------------------------------------------------------
//catches the events date type inputs from document in order to that the start date is less than the end date
function checkDateRangeValidity(){
  let startDate = new Date($('#startDate').val());
  let devolutionDate = new Date($('#devolutionDate').val());
  let validity = true;

  if (startDate > devolutionDate || startDate > devolutionDate) {
    alert('La fecha de INICIO no puede ser posterior que la fecha de DEVOLUCIÓN o visceversa');
    validity = false;
  }

  return validity;
}

//-----------------------------------------------------------------------------