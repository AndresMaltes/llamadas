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

  firebase.initializeApp(firebaseConfig);

//Elementos para abrir el boton de registrar usuario


const openModal = document.getElementById('openRegister');
const modal = document.getElementById('modal');

const updateModal = document.getElementById('modal-update')
const updateForm = document.getElementById('update-form');
const closeUpdateModal = document.getElementById('closeUpdateModal')

const addModal = document.getElementById('modal-add')


const closeModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('register-form');
const userRef = firebase.database().ref('Usuarios');

const userData = document.getElementById('userTable');

const btnAgregarContacto = document.getElementById('btnAdd')
const containerAdd = document.getElementById('add-container')

const registerAddForm = document.getElementById('add-form');

const showRegisterModal = () => (
    modal.classList.toggle('is-active')
)

openModal.addEventListener('click', (showRegisterModal))
closeModal.addEventListener('click', (showRegisterModal))


const deleteStudent = (uid) => {
    firebase.database().ref(`Usuarios/${uid}`).remove()
}

const showUpdateModal = () => {
    updateModal.classList.toggle('is-active')
}

const showAddModal = () => {
    addModal.classList.toggle('is-active')
}


function AgregarContacto(){
    contenido.innerHTML += `
    <div id="add-container">
        <button class="delete" arial-label="close" id="closeAddForm" onclick="CloseAddForm()"></button>
        <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
            <input class="input" type="text" placeholder="Escribe tu nombre" name="nombre">
            </div>
        </div>
        
        <div class="field">
            <label class="label">Telefono</label>
            <div class="control has-icons-left">
            <input class="input" type="tel" placeholder="Escribe tu numero de telefono" name="cel">
            <span class="icon is-small is-left">
                <i class="fas fa-phone"></i>
            </span>
            </div>
        </div>

        <button class="button is-success" type="submit">
            <i class="fas fa-save"></i>
            <span>In Usuario</span>
        </button>
    </div>
    `
    console.log("entro");
}

closeUpdateModal.addEventListener('click', showUpdateModal)

closeAddModal.addEventListener('click', showAddModal)

window.addEventListener('DOMContentLoaded', async (e) => {
    await userRef.on('value', (students) => {
        userTable.innerHTML = ''
        students.forEach((user) =>{
            let userData = user.val()
            userTable.innerHTML += `
            <tr>
                <td>${userData.Nombre}</td>
                <td>${userData.Telefono}</td>
                <td>
                    <button class="button is-warning" data-id="${userData.Uid}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="button is-danger" data-id="${userData.Uid}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="button is-info" data-id="${userData.Uid}">
                        <i class="fas fa-plus"></i>
                    </button>
                </td>
            </tr>
            `
            const updateButtons = document.querySelectorAll('.is-warning')
            updateButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    showUpdateModal()
                    firebase.database().ref(`Usuarios/${e.target.dataset.id}`).once('value').then((user) =>{
                        const data = user.val()
                        updateForm['nombre'].value = data.Nombre
                        updateForm['cel'].value = data.Telefono
                    })
                    const uid = e.target.dataset.id
                    updateForm.addEventListener('submit', (e) => {
                        e.preventDefault()

                        const nombre = updateForm['nombre'].value
                        const telefono = updateForm['cel'].value

                        firebase.database().ref(`Usuarios/${uid}`).update({
                            Nombre: nombre,
                            Telefono: telefono
                        })
                        showUpdateModal()
                    })
                })
            })

            const deleteButtons = document.querySelectorAll('.is-danger')
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    deleteStudent(e.target.dataset.id)
                })
            })

            const addButton = document.querySelectorAll('.is-info')
            addButton.forEach((button) => {
                button.addEventListener('click', (e) => {
                    
                    firebase.database().ref(`Usuarios/${e.target.dataset.id}`).once('value').then((user) =>{
                        const data = user.val()
                        showAddModal()
                        contenido.innerHTML = `

                        <div id="encabezado">
                            <h1 style="margin-right: 400px ;"> Bienvenido  ${data.Nombre}</h1>

                            <button class="button is-info" id="btnAdd" onclick="AgregarContacto()">
                                <i class="fas fa-plus">
                                </i>
                            </button>
                        </div>

                        
                        `

                        registerAddForm.addEventListener('submit', (e) => {
                            e.preventDefault()
                            
                            const nombre = registerAddForm['nombre'].value
                            const telefono = registerAddForm['cel'].value
                        
                            const contacRef = firebase.database().ref('Usuarios/'+data.Uid+'/Contactos');
                            const registerContact = contacRef.push()
                            registerContact.set({
                                Uid: registerContact._delegate._path.pieces_[1],
                                Nombre: nombre,
                                Telefono: telefono
                            })
                            showRegisterModal()
                        })
                    })
                    
                    
                })
            })
        }) 
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const nombre = registerForm['nombre'].value
    const telefono = registerForm['cel'].value

    const registerStudent = userRef.push()
    registerStudent.set({
        Uid: registerStudent._delegate._path.pieces_[1],
        Nombre: nombre,
        Telefono: telefono
    })
    showRegisterModal()
})

