(function() {
    'use strict';

    let monPanier = JSON.parse(localStorage.getItem('panier'));
    if (monPanier == null || monPanier.length == 0){   /* --- monPanier.length == 0 --- */
        let cacheForm = document.getElementById("commandeForm");
        cacheForm.classList.add("cache-formulaire"); 
    } else {
        let productId = [];
        let recupPanier = document.getElementById("recup");
        let totalPrice = 0;
        for(let i = 0; i < monPanier.length; i++) {
            productId.push(monPanier[i].id);
            totalPrice = totalPrice + monPanier[i].price;
            recupPanier.innerHTML += 
            `<div class="col-12 col-md-8 mt-5">
                <div class="card card__css">
                    <div class="card-body">
                        <h3 class="card-title h4">${monPanier[i].name}</h3>
                        <p class="card-text font-weight-bold">${monPanier[i].price} €</p>
                        <p class="card-text">${monPanier[i].description}</p>
                    </div>
                </div>
            </div>`;
        }

        // pour désactiver la soumission de formulaires s'il y a des champs non valides
        window.addEventListener('load', function() {
            // Récupère tous les formulaires auxquels nous voulons appliquer des styles de validation Bootstrap personnalisés
            let forms = document.getElementsByClassName('needs-validation');
            // Boucle sur eux et empêche la soumission
            // Loop over them and prevent submission
            Array.prototype.filter.call(forms, function(form) {   /* != forms.forEach(function(form){......}) */
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                    } else {
                        event.preventDefault();
                        let xhrPanier = new XMLHttpRequest();
                        xhrPanier.onreadystatechange = function() {
                            console.log(this);
                            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                                let resultOrder = JSON.parse(this.responseText);
                                // confirmation
                                let orderNumber = resultOrder.orderId;
                                localStorage.setItem("confirmForm", orderNumber);
                                // ---------- somme totale -------------------------------------------------------------
                                localStorage.setItem("confirmPrice", totalPrice);
                                // ----------------------------------------------------------
                                window.location.href="confirmation.html";
                                console.log(resultOrder);
                            }
                        };  
        
                        xhrPanier.open("POST", "http://localhost:3000/api/cameras/order"); /* --- order ou autre chose, cela dépend de la programmation de l'API ---- */
                        let lastName = document.getElementById("last-name").value;
                        let firstName = document.getElementById("first-name").value;
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
                        /* on dit qu'on envoie du JSON */
                        xhrPanier.send(JSON.stringify(data));
                        /* transforme notre objet en chaine de caractère */
                    }
                    // quand on a soumit le formulaire en appuyant sur le bouton, même si il est mal remplit
                    form.classList.add('was-validated'); 

                })
            })
        })
    }
  
})() 

