// var urlSearchParams = URL.searchParams;
// https://example.com/?nom=Jonathan%20Smith&age=18
let params = (new URL(document.location)).searchParams;
// let name = params.get('nom'); // la chaine de caractère "Jonathan Smith".
// let age = parseInt(params.get('age')); // le nombre 18

// let params = ...
let id = params.get('id');
console.log(id);

let xhr = new XMLHttpRequest();
let cameras = document.getElementById("the-camera");
xhr.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let cams = JSON.parse(this.responseText);
            cameras.innerHTML += 
            `<div class="col-md-4 mt-5">
                <div class="card">
                    <img src="${cams.imageUrl}" height="200" alt="appareil photo">
                    <div class="card-body">
                        <h3 class="card-title h4">${cams.name}</h3>
                        <p class="card-text">${cams.description}</p>
                        <a href="produit.html?id=${cams._id}" class="btn btn-primary stretched-link">Voir l'article</a>
                    </div>
                </div>
            </div>`;
        
        console.log(cams);
    }
};
xhr.open("GET", "http://localhost:3000/api/cameras/" + id);
xhr.send();


