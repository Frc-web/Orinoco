let request = (url, method = "GET" , data = null) => { 
    return new Promise((resolve, reject) => { 
        let xhrCameras = new XMLHttpRequest();   
        xhrCameras.onreadystatechange = function() {
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
        /* on dit qu'on envoie du JSON */
        xhrCameras.setRequestHeader("Content-Type", "application/json"); 
        xhrCameras.send(data);
    }) 
}