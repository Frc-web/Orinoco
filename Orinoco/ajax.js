let request = (url, method = "GET" , data = null) => { 
    return new Promise((resolve, reject) => { 

        let xhrIndexCameras = new XMLHttpRequest();   
        xhrIndexCameras.onreadystatechange = function() {
            console.log(this); /* pour voir l'état de la requête ou console.log(xhrIndexCameras) */
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    let response = JSON.parse(this.responseText);
                    resolve(response); 
                } else {              
                    reject(xhrIndexCameras); 
                }   
            }
        };
        xhrIndexCameras.onerror = function(error) {
            reject(error);
        } 
        xhrIndexCameras.open(method, url); 
        xhrIndexCameras.send(data);
    }) 
};