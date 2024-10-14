window.addEventListener("load", function () {
    const msgSuccess = document.getElementById("msgSuccess");
    const btnCierreSesion = this.document.getElementById("btnCierreSesion");
  
    // recuperar nombre de usuario
    const result = JSON.parse(window.localStorage.getItem("result"));
    mostrarAlerta(result.nombreUsuario);
  
  
    //obtener numero de doc y tipo de doc
    var tipoDoc = "";
    var numDoc = "";  
  
     numDoc = window.localStorage.getItem("nroDoc");
     tipoDoc = window.localStorage.getItem("tipoDoc");
 
    //limpiar storage
   // window.localStorage.removeItem("nroDoc");
   // window.localStorage.removeItem("tipoDoc");
  
    btnCierreSesion.addEventListener("click", function () {
  
      cerrarSesion(numDoc, tipoDoc);
  
    });
  });
  
  function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = "block";
  }
  
  function ocultarAlerta() {
    msgSuccess.innerHTML = "";
    msgSuccess.style.display = "none";
  }
  
  async function cerrarSesion(numDoc, tipoDoc) {

    var hoy = new Date()
    var dia = hoy.getDate();  
    var mes = hoy.getMonth()+1;
    var year = hoy.getFullYear();
    var hora = hoy.getHours();
    var min = hoy.getMinutes();
    var sec = hoy.getSeconds();
    const time = `${dia}/${mes}/${year} - ${hora}:${min}:${sec}`

    const url = "http://localhost:8082/login/out-async";
    const data = {
      tipoDocumento: tipoDoc ,
      numeroDocumento: numDoc ,
      fechaCierre:  time
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      
      if (!response.ok) {
        msgSuccess.style.background = '#e05555';
        msgSuccess.style.color = 'white';
        mostrarAlerta("Error: Ocurrió un problema en el cierre de Sesion");
        throw new Error('Error: ${response.statusText}');
      }
  
      //window.location.replace("indice.html");
  
    } catch (error) {
      console.error('Error: Ocurrió un problema al cerrar Sesión. ', error);
      mostrarAlerta('Error: Ocurrió un problema al cerrar Sesión.');
    }
  }