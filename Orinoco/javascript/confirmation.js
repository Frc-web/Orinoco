(function() {
    'use strict';

    let sommeTotale = localStorage.getItem('confirmPrice');
    let confirmPanier = localStorage.getItem('confirmForm');
    if (confirmPanier == null) {
        location.href = "index.html";
    }
    let recupConfirm = document.getElementById("confirm");
    recupConfirm.innerHTML += 
    `<div class="col-12 col-md-8 mt-5">
        <div class="card card__css">
            <div class="card-body">Merci pour votre commande n° : <br> <span class="font-weight-bold">${confirmPanier}</span>
            </div>
            <div class="card-body">Le montant total s'élève à <span class="font-weight-bold">${sommeTotale} €</span>
            </div>
        </div>
    </div>`;
    localStorage.clear();


})() 