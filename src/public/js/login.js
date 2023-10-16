const form = document.getElementById('formLogin');

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
            .then(json => { 
                window.location.replace('/products');
            } 
            )}
            else if (result.status === 401) {
                alert('Usuario o contraseña incorrectos');
            };
    });
});