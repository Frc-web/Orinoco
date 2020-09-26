let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

let xhrImg = new XMLHttpRequest();
let cameraImg = document.getElementById("camera-img");
xhrImg.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let cams = JSON.parse(this.responseText);
            cameraImg.innerHTML += 
            `<div class="mt-5">
                <div class="card">
                    <img src="${cams.imageUrl}" height="350" alt="appareil photo"></img>
                </div>
            </div>`;
        console.log(cams);
    }
};
xhrImg.open("GET", "http://localhost:3000/api/cameras/" + id);
xhrImg.send();

let xhrDescription = new XMLHttpRequest();
let cameraDescription = document.getElementById("camera-description");
xhrDescription.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let cams = JSON.parse(this.responseText);
        let select = '<select class="form-control" id="inputGroupSelect01">';
        cams.lenses.forEach(function(lense){
            select += "<option>" + lense + "</option>";
        })
            select += "</select>";
            cameraDescription.innerHTML += 
            `<div class="mt-5">
                <div class="card card__produit">
                    <div class="card-body">
                        <h3 class="card-title h4">${cams.name}</h3>
                        <p class="card-text">${cams.description}</p>
                        <p class="card-price font-weight-bold">${cams.price / 100 + " €"}</p>
                        <div class="input-group mt-5 mb-4">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        </div>
                            ${select}
                        </div>
                        <a href="panier.html?id=${cams._id}" id="addCard" class="btn btn-danger mt-3">ajoutez au panier</a>
                    </div>
                </div>
            </div>`;
            document.getElementById("addCard").addEventListener("click", function(e){
                e.preventDefault();
                localStorage.setItem('panier', id);
            });
    }
};
xhrDescription.open("GET", "http://localhost:3000/api/cameras/" + id);
xhrDescription.send();






