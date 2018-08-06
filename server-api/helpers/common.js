var googleAPI=require('../config/googleAPI')
var axios = require('axios')

var commonFunctions = {
    entitiesDistanceValidator: (_entities, req, callback) => {
        var _count = 0;
        var distance = require('google-distance');
        distance.apiKey = 'AIzaSyCtwSrfVg4SzAG4Y3Rg8qyCdVqEutqhou0';
        _length = _entities.length;

        _entities.forEach(function (element, i) {
            distance.get(
                {
                    origin: req.body.loc,
                    destination: element.location,
                    units: 'imperial',
                    mode: 'driving'
                },
                function (err, data) {
                    if (err) {
                        return callback(err)
                    }
                    _count++;

                    if (data.distance.split(' ')[0] > req.body.dist) {
                        _entities = _entities.filter(
                            user => {
                                return (JSON.stringify(user) != JSON.stringify(element))
                            });
                    }
                    if (_count === _length) {
                        console.log(JSON.stringify(_entities))
                        callback(err, _entities);
                        return;
                    }
                })
        }
        )

    },
    usersPresentInRadialDistance: (_users, res) => {

        var currentLocation = 'Amritsar, Punjab, India'
        var locationToValidate = 'Chajjal Wadi, Punjab, India'
        var withinDistance = 50;
        googleAPI.defult.findLatLon()
    }
}
exports.commonFunctions = commonFunctions;