// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';

myFunction();


const authSection = document.getElementById('authSection'); // Sección de registro
const contentPage = document.getElementById('contentPage');

// Función que carga el Sign In
function loadSignIn() {
  const sbSingIn = document.createElement('button');
  sbSingIn.innerText = 'Entrar';
  sbSingIn.addEventListener('click', () => {
    sendButtonLogIn();
  });
  const toggleToSignUp = document.createElement('button');
  toggleToSignUp.innerHTML = 'No tengo cuenta';
  toggleToSignUp.addEventListener('click', () => {
    loadSignUp();
  });
  authSection.innerHTML = `
    <h1>Log in</h1>
    <input type="email" id="emailLogIn" placeholder="Email">
    <input type="password" id="passwordLogIn" placeholder="Contraseña">
  `;
  authSection.appendChild(sbSingIn);
  authSection.appendChild(toggleToSignUp);
}

// Función que carga el Sign Up
function loadSignUp() {
  const sb = document.createElement('button');
  sb.innerText = 'Registrarme';
  sb.addEventListener('click', () => {
    sendButton();
  });
  const toggleToSignIn = document.createElement('button');
  toggleToSignIn.innerHTML = 'Ya tengo cuenta';
  toggleToSignIn.addEventListener('click', () => {
    loadSignIn();
  });

  authSection.innerHTML = `
      <h1>Sign up</h1>
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Contraseña">
  `;
  authSection.appendChild(sb);
  authSection.appendChild(toggleToSignIn);
}

// Crear y Registrar usuario con Firebase
const sendButton = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      emailVerification();
      afterLogIn(user);
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
};


// Loggear usuario con Firebase
const sendButtonLogIn = () => {
  const email = document.getElementById('emailLogIn').value;
  const password = document.getElementById('passwordLogIn').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
};

// Observador que te dice si hay usuario logueado o no
function observerAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Existe usuario activo');
      afterLogIn(user);
      // User is signed in.
      const displayName = user.displayName;
      console.log(user);
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      // ...
    } else {
      loadSignUp();
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
}

observerAuth();

// Función para generar el contenido luego del Log in.
function afterLogIn(user) {
  if (user.emailVerified) {
    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'Cerrar Sesión';
    buttonClose.addEventListener('click', () => {
      closeSession();
    });
    contentPage.innerHTML = `<h3>Bienvenido</h3>`;
    contentPage.appendChild(buttonClose);
    authSection.innerHTML = '';
  } else {
    console.log('No está verificado');
    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'Cerrar Sesión';
    buttonClose.addEventListener('click', () => {
      closeSession();
    });
    contentPage.innerHTML = '<p>Verifica tu mail para poder entrar a la aplicación</p>';
    contentPage.appendChild(buttonClose);
    authSection.innerHTML = '';
  }
}

// Función que envía el mail de verificación
function emailVerification() {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      console.log('Enviando correo...');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// Función que cierra sesión
const closeSession = () => {
  firebase.auth().signOut()
        .then(() => {
          console.log('Saliendo');
          contentPage.innerHTML = '';
        })
        .catch((error) => {
          console.log(error);
        });
}
