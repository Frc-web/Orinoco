(function() {
    'use strict'; 
 
    let params = (new URL(document.location)).searchParams;
    let contentId = params.get('idCamera');

    let cameraImg = document.getElementById("produit-img");
    let cameraDescription = document.getElementById("produit-description");

    if (contentId == null) { 
        location.href = "index.html";    
    }
    
    request("http://localhost:3000/api/cameras/" + contentId).then(respCamsProduit => {
        
            /* -------------- sélection de la lentille ---------------- */
            let select = '<select class="form-control" id="selectLense">';
            respCamsProduit.lenses.forEach(function(choiceLense){
                select += "<option>" + choiceLense + "</option>";
            });
            select += "</select>";
            /* --------------------------------------------------------- */
            cameraImg.innerHTML = 
            `<div class="card card__css">
                <img src="${respCamsProduit.imageUrl}" height="350" alt="appareil photo"></img>
            </div>`;
            cameraDescription.innerHTML = 
            `<div class="card card__css card__css__produit">
                <div class="card-body">
                    <h3 class="card-title h4">${respCamsProduit.name}</h3>
                    <p class="card-text">${respCamsProduit.description}</p>
                    <p class="card-text font-weight-bold">${respCamsProduit.price / 100 + " €"}</p>
                    <div class="input-group mt-4 mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="selectLense">Objectif</label>
                        </div>
                        ${select}
                    </div>
                    <a href="panier.html" id="addCam" class="btn btn-primary btn__css mt-3">ajoutez au panier</a>
                </div>
            </div>`;
            /* ----- bouton panier ----- */
            document.getElementById("addCam").addEventListener("click", function(e){
                e.preventDefault();
                let panier = [];
                if (localStorage.getItem("panier")) {
                    panier = JSON.parse((localStorage.getItem("panier")));
                }
                let objProduit = {
                    id: contentId, /* ou respCams._id */
                    name: respCamsProduit.name,
                    price: respCamsProduit.price / 100,
                    description: respCamsProduit.description
                };
                panier.push(objProduit);
                localStorage.setItem("panier", JSON.stringify(panier));
                window.location.href="panier.html";
            });
        
    }).catch(error => {
        camerasIndexList.innerHTML = "Impossible de récupérer les caméras";
    });

})() 