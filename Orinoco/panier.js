(function() {
    'use strict';

    let monPanier = JSON.parse(localStorage.getItem('panier'));
    let productId = [];
    let recupPanier = document.getElementById("recup");
        
    for(let i = 0; i < monPanier.length; i++) {
        productId.push(monPanier[i]._id)
        recupPanier.innerHTML += 
        `<div class="col-12 col-md-8 mt-5">
            <div class="card card__css">
                <div class="card-body">
                    <h3 class="card-title h4">${monPanier[i].name}</h3>
                    <p class="card-text font-weight-bold">${monPanier[i].price}</p>
                    <p class="card-text">${monPanier[i].description}</p>
                </div>
            </div>
        </div>`;
    };


         
    let clicButon = function (e) {
        e.preventDefault();
        let xhrPanier = new XMLHttpRequest();
        xhrPanier.onreadystatechange = function() {
            // console.log(this); /* pour voir l'état de la requête */
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let respCams = JSON.parse(this.responseText);
                console.log(respCams);
            }
        };
      
        xhrPanier.open("POST", "http://localhost:3000/api/cameras/order");
        let firstName = document.getElementById("first-name").value;
        let lastName = document.getElementById("last-name").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let data = {
            contact: 
                {lastName: lastName,
                firstName: firstName,
                email: email,
                address: address,
                city: city
            },
            products: productId
        };
        xhrPanier.setRequestHeader("Content-Type", "application/json"); 
        xhrPanier.send(JSON.stringify(data));
    };
        let buttonSend = document.getElementById("sendCommand");
        buttonSend.addEventListener("click", clicButon);




    // pour désactiver la soumission de formulaires s'il y a des champs non valides
    window.addEventListener('load', function() {
        // Récupérez tous les formulaires auxquels nous voulons appliquer des styles de validation Bootstrap personnalisés
        let forms = document.getElementsByClassName('needs-validation');
        // Bouclez-les et empêchez la soumission
        let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                }
                form.classList.add('was-validated');
            });
        });
    });


})(); /*()appel de la fonction*/