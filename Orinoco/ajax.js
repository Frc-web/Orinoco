let request = (url, method = "GET" , data = null) => { 
    return new Promise((resolve, reject) => { 

        let xhrCameras = new XMLHttpRequest();   
        xhrCameras.onreadystatechange = function() {
            console.log(this); /* pour voir l'état de la requête ou console.log(xhrIndexCameras) */
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    let response = JSON.parse(this.responseText);
                    resolve(response); 
                } else {              
                    reject(xhrCameras); 
                }   
            }
        };
        xhrCameras.onerror = function(error) {
            reject(error);
        } 
        xhrCameras.open(method, url); 
        xhrCameras.setRequestHeader("Content-Type", "application/json"); 
        /* on dit qu'on envoie du JSON */
        xhrCameras.send(data);
    }) 
};