(function() {
    'use strict';

    let camerasIndexList = document.getElementById("index-cameras");
  
    request("http://localhost:3000/api/cameras").then(respCamsIndex => {
        console.log(respCamsIndex); /* pour voir la réponse */
        for(let i = 0; i < respCamsIndex.length; i++) {
            camerasIndexList.innerHTML +=
            `<div class="col-12 col-md-6 col-lg-4 mt-5">
                <div class="card card__css">
                    <img src="${respCamsIndex[i].imageUrl}" height="200" alt="appareil photo">
                    <div class="card-body">
                        <h3 class="card-title h4">${respCamsIndex[i].name}</h3>
                        <p class="card-text">${respCamsIndex[i].description}</p>
                        <a href="produit.html?idCamera=${respCamsIndex[i]._id}" class="stretched-link"></a>
                    </div>
                </div>
            </div>`;
        }
    }).catch(error => {
        console.log(error);
    });
        
           

        
 

})() /*()appel de la fonction*/

