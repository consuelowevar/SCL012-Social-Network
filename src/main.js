// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';

myFunction();


const sendButton = document.getElementById('send');

sendButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      emailVerification();
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    // ...
    });
});

const sendButtonLogIn = document.getElementById('sendLogIn');

sendButtonLogIn.addEventListener('click', () => {
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
});

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
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
}

observerAuth();


function afterLogIn(user) {
  const contentPage = document.getElementById('contentPage');
  if (user.emailVerified) {
    contentPage.innerHTML = `
    <h3>Bienvenido</h3>
    <button id='closeSession'>Cerrar Sesión</button>`;

    const closeSession = document.querySelector('#closeSession');
    closeSession.addEventListener('click', (er) => {
      firebase.auth().signOut()
        .then(() => {
          console.log('Saliendo');
        })
        .catch((error) => {
          console.log(error);
        });
      er.preventDefault();
    });
  } else{
    console.log('No está verificado')
  }
}

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
