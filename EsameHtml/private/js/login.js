console.log("script start ok");

let btnLogin = document.getElementById("btnLogin");
let btnCrea = document.getElementById("btnCrea");


btnLogin.addEventListener("click", v => {
    
    v.preventDefault();
    console.log("Script Login ...");
     
    let txtusr = document.getElementById("user");
    let txtpwd = document.getElementById("pwd");


    const credential = {
        usr:txtusr.value,
        pwd:txtpwd.value
    };
    
    console.log(JSON.stringify(credential)); /*stampare una string Json*/
    
    fetch('https://bkmapp.tssdev.it/resources/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
    }).then(response => response.json())
       .then(data => {
            window.sessionStorage.setItem("token", data.jwt);
            let decoded = jwt_decode(sessionStorage.getItem("token"));
            sessionStorage.setItem("name", decoded.upn);
            sessionStorage.setItem("id", decoded.sub);
            document.querySelector("#loggeduser").innerHTML = sessionStorage.getItem("name");
            console.log("Token armazenado")
      });  
});



btnCrea.addEventListener("click", v => {

    console.log("Script Crea Utente ...");

    v.preventDefault();

    let txtnome = document.getElementById("nome");
    let txtcognome = document.getElementById("cognome");
    let txtemail = document.getElementById("email");
    let txtpwdc = document.getElementById("pwdc");

    
    const User = {
        first_name :txtnome.value,
        last_name:txtcognome.value,
        email:txtemail.value,
        pwd:txtpwdc.value
    };
    
    console.log(JSON.stringify(User)); /*stampare una string Json*/
    
    fetch('https://bkmapp.tssdev.it/resources/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(User)
    }).then(response => response.json())
      .then(data => {
          document.querySelector("#loggeduser").innerHTML = "Utente creato!";
          console.log(data);
      })
})