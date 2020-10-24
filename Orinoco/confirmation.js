(function() {
    'use strict';

    let confirmPanier = localStorage.getItem('confirmForm');
        if (confirmPanier == null) {
            location.href = "index.html";
        }
        let recupConfirm = document.getElementById("confirm");
            recupConfirm.innerHTML += 
            `<div class="col-12 col-md-8 mt-5">
                <div class="card card__css">
                    <div class="card-body">Numéro de commande ${confirmPanier}
                    </div>
                </div>
            </div>`;

        localStorage.clear();

})(); /*()appel de la fonction*/