var axios = require('axios')

var googleAPI = {
    
    findLatLon: () => {
        const status = { errors: [] };
        var data={
            address:'1600 Amphitheatre Parkway, Mountain View, CA',
            key:require('../config/config').googleApiCreds.key 
        }
        var locationPromise = new Promise((resolve, reject) => {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&key=${data.key}`, data)
                .then((response) => { console.log(response); resolve(response)})
                .catch((error) => { console.log(error); reject(error)})
        })
        return locationPromise;

    }

}

exports.defult = googleAPI;