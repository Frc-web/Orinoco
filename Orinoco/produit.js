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
            `<div class="col-md-6 mt-5">
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
            cameraDescription.innerHTML += 
            `<div class="col-md-6 mt-5">
                <div class="card card__produit">
                    <div class="card-body">
                        <h3 class="card-title h4">${cams.name}</h3>
                        <p class="card-text">${cams.description}</p>
                        <p class="card-price">${cams.price / 100 + " €"}</p>
                        <a href="produit.html?id=${cams._id}" class="stretched-link"></a>
                    </div>
                </div>
            </div>`;
        console.log(cams);
    }
};
xhrDescription.open("GET", "http://localhost:3000/api/cameras/" + id);
xhrDescription.send();


