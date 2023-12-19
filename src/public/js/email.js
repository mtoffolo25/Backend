let button = document.getElementById('emailSend')

button.addEventListener('load', alert ());

function alert () { let timerInterval;
Swal.fire({
  title: "Enviando correo electrónico con la confirmación de compra.",
  html: "La ventanta se cerrará en <b></b> milisegundos.",
  timer: 5000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
  }
});
}