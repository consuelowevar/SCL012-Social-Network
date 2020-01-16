// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';

myFunction();

const sendButton = document.getElementById('send');


sendButton.addEventListener('click', () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // [END_EXCLUDE]
  });

});