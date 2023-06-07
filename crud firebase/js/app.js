const firebaseConfig = {
    apiKey: "AIzaSyDUXNlRkmHUaElSku5Fr-c4dhezZTMkupA",
    authDomain: "arkitask-ee3f0.firebaseapp.com",
    databaseURL: "https://arkitask-ee3f0-default-rtdb.firebaseio.com",
    projectId: "arkitask-ee3f0",
    storageBucket: "arkitask-ee3f0.appspot.com",
    messagingSenderId: "600440500538",
    appId: "1:600440500538:web:d4d87bed215bb152ffa003",
    measurementId: "G-024DH381F1"
  };
  


const openModal = document.getElementById('openRegisterModal');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeRegisterModal')
const registerForm = document.getElementById('register-form');

const usersTable = document.getElementById('users-table')
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const userRef = firebase.database().ref('TheUsers/' + registerForm['user'].value)

function showRegisterModal(){
    modal.classList.toggle('is-active')
}

window.addEventListener('DOMContentLoaded', async (e) =>{
    await userRef.on('value', (users) =>{
        users.forEach(user => {
            let userData = user.val()
            usersTable.innerHTML += `
                <tr>
                    
                    <td>${userData.User}</td>
                    <td>${userData.Nombre}</td>
                    <td>${userData.Password}</td>
                    <td>${userData.Confirm_Password}</td>
                    <td>${userData.Rol}</td>
                    <td>
                        <button class="button is-warning" data-id="${userData.Uid}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="button is-danger" >
                            <i class="fas fa-trash"></i></td>
                        </button>
                </tr>`
                console.log(userData);
                console.log(userData[4].Rol);
        });
        
    })
})


function insertData(){
    
    const user = registerForm['user'].value;
    const nombre = registerForm['nombre'].value;
    const password = registerForm['password'].value
    const password2 = registerForm['password'].value
    const rol = registerForm['rol'].value
    
    const registerUser = userRef.push();
    registerUser.set({
        User: user,
        Nombre: nombre,
        Password: password,
        Confirm_Password: password2,
        Rol: rol
    })
    showRegisterModal()
}