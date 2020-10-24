(function() {
    'use strict';

    let xhrIndexCameras = new XMLHttpRequest();
    let cameras = document.getElementById("index-cameras");
    xhrIndexCameras.onreadystatechange = function() {
        console.log(this); /* pour voir l'état de la requête ou console.log(xhrIndexCameras)*/
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let respCams = JSON.parse(this.responseText);
            for(let i = 0; i < respCams.length; i++) {
                cameras.innerHTML += 
                `<div class="col-12 col-md-6 col-lg-4 mt-5">
                    <div class="card card__css">
                        <img src="${respCams[i].imageUrl}" height="200" alt="appareil photo">
                        <div class="card-body">
                            <h3 class="card-title h4">${respCams[i].name}</h3>
                            <p class="card-text">${respCams[i].description}</p>
                            <a href="produit.html?idCamera=${respCams[i]._id}" class="stretched-link"></a>
                        </div>
                    </div>
                </div>`;
            }
            console.log(respCams); /* pour voir la réponse */
        }
    };
    xhrIndexCameras.open("GET", "http://localhost:3000/api/cameras");
    xhrIndexCameras.send();

})(); /*()appel de la fonction*/