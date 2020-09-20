let xhr = new XMLHttpRequest();
let cameras = document.getElementById("camera");
xhr.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let cams = JSON.parse(this.responseText);
        for(let i = 0; i < cams.length; i++) {
            cameras.innerHTML += 
            `<div class="col-12 col-md-6 col-lg-4 mt-5">
                <div class="card">
                    <img src="${cams[i].imageUrl}" height="200" alt="appareil photo">
                    <div class="card-body">
                        <h3 class="card-title h4">${cams[i].name}</h3>
                        <p class="card-text">${cams[i].description}</p>
                        <a href="produit.html?id=${cams[i]._id}" class="stretched-link"></a>
                    </div>
                </div>
            </div>`;
        }
        console.log(cams);
    }
};
xhr.open("GET", "http://localhost:3000/api/cameras");
xhr.send();


