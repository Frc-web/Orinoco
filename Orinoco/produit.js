(function() {
    'use strict'; 
 
    let params = (new URL(document.location)).searchParams;
    let contentId = params.get('idCamera');
    // console.log(contentId);

    let xhrProduitDescription = new XMLHttpRequest();
    let cameraImg = document.getElementById("produit-img");
    let cameraDescription = document.getElementById("produit-description");
    xhrProduitDescription.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let respCams = JSON.parse(this.responseText);
            // console.log(respCams); /* pour voir la réponse de la caméra sélectionnée */
            let select = '<select class="form-control" id="selectLense">';
            respCams.lenses.forEach(function(choiceLense){
                select += "<option>" + choiceLense + "</option>";
            })
            /* ou
            for (let i = 0; i < respCams.lenses.length; i++) {
                select += "<option>" + respCams.lenses[i] + "</option>";
            } */
            select += "</select>";
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
                let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
                console.log(panier);
                let obj = {
                    id: contentId, /* ou respCams._id */
                    name: respCams.name,
                    price: respCams.price / 100,
                    description: respCams.description
                };
                panier.push(obj); /* --?--*/
                console.log(panier);
                localStorage.setItem("panier", JSON.stringify(panier));
                // console.log("test"); /* pour tester le bouton */
                window.location.href="panier.html";
            });
        }
    };
    xhrProduitDescription.open("GET", "http://localhost:3000/api/cameras/" + contentId);
    xhrProduitDescription.send();

})(); /*()appel de la fonction*/




