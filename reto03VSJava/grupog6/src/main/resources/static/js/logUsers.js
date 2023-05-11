const URL_LOGIN = "http://141.148.20.35:8080/api/login";

function validateUser() {
    let user = {
        email: $("#email").val(),
        password: $("#password").val()
    };

  $.ajax({
    url: URL_LOGIN,
    type: "POST",
    dataType: "json",
    contentType: "application/json;",
    data:JSON.stringify(user),
    success: function (response) {
      saveUser(response); //"response.items" has been deleted 'cause it doesn't work forward
    },
    error: function (xhr, status) {
      alert("No existe usuario");
    },
    complete: function (xhr, status) {
      //   alert("Petición realizada");
    },
  });
}

function saveUser(data){
    sessionStorage.setItem("idUser", data.idRol);
    sessionStorage.setItem("rol", data.rol);
    sessionStorage.setItem("name", data.name);
    location.href = "./menuMain.html";
}

function registerUser() {
  sessionStorage.setItem("thisUrl", window.location.href);
  location.href = "./clientRegister.html";
}
