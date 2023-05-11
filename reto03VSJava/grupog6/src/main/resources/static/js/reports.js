URL_RESERVATION = 'http://localhost:8080/api/Reservation/';
URL_CLIENT = 'http://localhost:8080/api/Client/';
const tHeadersReservation = ["ID","F. INICIO","F. FIN","ID CLIENTE","CLIENTE", "VEHICULO","CALIFICIÓN"];
const tHeadersClientsTop = ["PUESTO N°","ID", "NOMBRE","TOTAL RESERVAS"];

function reservationDates(){
    let startDate = $("#startDate").val();
    let endDate= $("#endDate").val();

    //verifying that all items in the form are complete.
    if (startDate == "" || endDate == "") {
        alert("Elija una fecha de inicio y una fecha de fin");
        return;
    } 
    
    $.ajax({
        url: URL_RESERVATION + 'report-dates/' +startDate + '/' + endDate,
        type: "GET",
        dataType: "json",
 
        success: function(response){
            $("#report-dates").text(response.length);
            reservationsDates(response);
        }, 
        error: function(xhr, status){
            alert("ha sucedido un error");
        },
        complete: function(xhr, status){
            //alert("peticion realizada");
        },
    });
}

function reservationsDates(data){
    let idTableHtml = 'table_reservations_dates';
    let htmlCode = "";
  
    //create the header's table
    htmlCode += " <thead><tr>"
    tHeadersReservation.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
        
    //fill the table's body with data from oracle DB
    htmlCode += "<tbody>";
  
    for (let i = 0; i < data.length; i++) {
        htmlCode += "<tr class='centrar'>";
        htmlCode += "<td>" + data[i].idReservation + "</td>";
        htmlCode += "<td>" + data[i].startDate.split('T')[0] + "</td>";
        htmlCode += "<td>" + data[i].devolutionDate.split('T')[0] + "</td>";
        htmlCode += "<td>" + data[i].client.idClient + "</td>";
        htmlCode += "<td>" + data[i].client.name + "</td>";
        htmlCode += "<td>" + data[i].car.name + "</td>";
        htmlCode += "<td>" + ((data[i].score==null)?"No calificado":data[i].score.result) + "</td>";
        htmlCode += "</tr>";
    }
    htmlCode += "</tbody>";
  
    //erase the table with old data and put new data 
    $("#" + idTableHtml).html("");
    $("#" + idTableHtml).empty();
    $("#" + idTableHtml).append(htmlCode);
}

function showReservationsDates(){
    let startDate = $("#startDate").val();
    let endDate= $("#endDate").val();
    if (startDate == "" || endDate == "") {
        alert("Elija una fecha de inicio y una fecha de fin");
        return;
    } 
    if ($('#table_reservations_dates').is(':visible')) {
        $('#table_reservations_dates').hide();
        $("#link_reservations_date").text('Ver las reservas entre las fechas seleccionadas');
    } else {
        $('#table_reservations_dates').show();
        $("#link_reservations_date").text('Ocultar tabla de reservas entre las fechas');
    }
}


function reservationStatus(){
    $.ajax({
        url: URL_RESERVATION + 'report-status-query',
        type: "GET",
        dataType: "json",

        success: function(response){
            $("#completed").text(response.completed);
            $("#cancelled").text(response.cancelled);
        },
        error: function(xhr, status){
            alert("ha sucedido un error");
        },
        complete: function(xhr, status){
            //alert("peticion realizada");
        },
    });
}


function topClients(){
    $.ajax({
        url: URL_RESERVATION + 'report-clients',
        type: "GET",
        dataType: "json",

        success: function(response){
            showTopClients(response);
        },
        error: function(xhr, status){
            alert("ha sucedido un error");
        },
        complete: function(xhr, status){
            //alert("peticion realizada");
        },
    });
}

function showTopClients(data){
    let idTableHtml = 'report-clients';
    let htmlCode = "";
  
    //create the header's table
    htmlCode += " <thead><tr>"
    tHeadersClientsTop.forEach(element => {
        htmlCode += "<th>" + element + "</th>";
    });
        
    //fill the table's body with data from oracle DB
    htmlCode += "<tbody>";
  
    for (let i = 0; i < data.length; i++) {
        htmlCode += "<tr class='centrar'>";
        htmlCode += "<td>" + (i+1) + "</td>";
        htmlCode += "<td>" + data[i].client.idClient + "</td>";
        htmlCode += "<td>" + data[i].client.name + "</td>";
        htmlCode += "<td>" + data[i].total + "</td>";
        htmlCode += "</tr>";
    }
    htmlCode += "</tbody>";
  
    //erase the table with old data and put new data 
    $("#" + idTableHtml).html("");
    $("#" + idTableHtml).empty();
    $("#" + idTableHtml).append(htmlCode);
}



//-----------------------------------------------------------------------------
//catches the events date type inputs from document in order to that the start date is less than the end date
$(document).ready(function() {
    $('#startDate').on('change', function() {
      let startDate = new Date($(this).val());
      let endDate = new Date($('#endDate').val());
      if (startDate > endDate) {
        alert('La fecha de inicio no puede ser mayor que la fecha de fin');
        $(this).val('');
      }
    });
    
    $('#endDate').on('change', function() {
      let endDate = new Date($(this).val());
      let startDate = new Date($('#startDate').val());
      if (startDate > endDate) {
        alert('La fecha de fin no puede ser menor que la fecha de inicio');
        $(this).val('');
      }
    });
  });
  //-----------------------------------------------------------------------------