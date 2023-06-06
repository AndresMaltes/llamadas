// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACCoUb4-Bv9rlxJVJH1Q3tJTLck7dTsvw",
    authDomain: "llamadas-84746.firebaseapp.com",
    databaseURL: "https://llamadas-84746-default-rtdb.firebaseio.com",
    projectId: "llamadas-84746",
    storageBucket: "llamadas-84746.appspot.com",
    messagingSenderId: "319966771410",
    appId: "1:319966771410:web:fb7e7ea40b4a93bb14150b",
    measurementId: "G-S9LWMLXT3B"
  };

  const app = initializeApp(firebaseConfig);
  import{getDatabase, ref, get, set, child, update, remove}
    from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"
  
    const db = getDatabase();

function ingresarLogin(){
    let telefono = document.getElementById('telefono').value;
    let nombre  = document.getElementById('nombre').value;
    firebase.database().ref('Usuarios/'+documento+0).once('value').then(
        function (result) {
            if(result){
                let title = result?.val()?.password;
                if(password == title){
                    document.getElementById('Ingreso').textContent='BIENVENIDO.';
                }else{
                    alert('Datos erroneos');
                }
            }else{
                alert('Datos erroneos desde la coleccion');
            }
            
        }
    )
}

function registrasDatos(){
    
    //Insercion de datos
    let telefono = document.getElementById('telefono').value;
    let nombre  = document.getElementById('nombre').value;
    set(ref(db, "Usuarios/" + telefono),{
        Telefono: telefono,
        Nombre: nombre
    })
    .then(()=>{
        alert("datos insertados exitosamente");
    })
    .catch((error)=>{
        alert("Fallo al insertar, error ", error)
    })

    console.log("Hola")
}