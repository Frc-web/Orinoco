(function() {
    'use strict'; 
 
    let params = (new URL(document.location)).searchParams;
    let contentId = params.get('idCamera');

    let cameraImg = document.getElementById("produit-img");
    let cameraDescription = document.getElementById("produit-description");

    let xhrProduitDescription = new XMLHttpRequest();
    xhrProduitDescription.onreadystatechange = function() {
        console.log(this);
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let respCams = JSON.parse(this.responseText);
            console.log(respCams);
            /* -------------- sélection de la lentille ---------------- */
            let select = '<select class="form-control" id="selectLense">';
            respCams.lenses.forEach(function(choiceLense){
                select += "<option>" + choiceLense + "</option>";
            })
            select += "</select>";
            /* --------------------------------------------------------- */
            cameraImg.innerHTML = 
            `<div class="card card__css">
                <img src="${respCams.imageUrl}" height="350" alt="appareil photo"></img>
            </div>`;
            cameraDescription.innerHTML = 
            `<div class="card card__css card__css__produit">
                <div class="card-body">
                    <h3 class="card-title h4">${respCams.name}</h3>
                    <p class="card-text">${respCams.description}</p>
                    <p class="card-text font-weight-bold">${respCams.price / 100 + " €"}</p>
                    <div class="input-group mt-5 mb-4">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="selectLense">Objectif</label>
                        </div>
                        ${select}
                    </div>
                    <a href="panier.html" id="addCam" class="btn btn-danger mt-3">ajoutez au panier</a>
                </div>
            </div>`;
            /* bouton panier */
            document.getElementById("addCam").addEventListener("click", function(e){
                e.preventDefault();
                console.log("test"); /* pour tester le bouton */
                let panier = JSON.parse(localStorage.getItem("panier")) ?? [];  
                let obj = {
                    id: contentId, /* ou respCams._id */
                    name: respCams.name,
                    price: respCams.price / 100,
                    description: respCams.description
                };
                panier.push(obj);
                localStorage.setItem("panier", JSON.stringify(panier));
                window.location.href="panier.html";
            })
        }
    };
    xhrProduitDescription.open("GET", "http://localhost:3000/api/cameras/" + contentId);
    xhrProduitDescription.send();

})() 




