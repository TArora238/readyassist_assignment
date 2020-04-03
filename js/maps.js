let map, marker, markers = [], markerCluster, i, locations = [], clusters = [];
const initLocation = {
    lat: 12.935,
    lng: 77.624
};
initMap = () => {
    let mapElement = document.getElementById('map');
    
    resizeMap();
    map = new google.maps.Map(
        mapElement, {
            zoom: 16,
            center: initLocation
        });
    fetchMarkers();
}

fetchMarkers = () => {
    locations = [];
    fetch('../json/markers.json')
        .then((resp) => resp.json())
        .then(function (data) {
            locations = data.markers;
            clusters = data.markers;
            initMarkers(locations);
        })
        .catch(function () {
            locations = [];
            initMarkers(locations);
        });
}

initMarkers = (locations) => {
    for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
    }
    markers = [];
    let bounds = new google.maps.LatLngBounds();
    for (const key in locations) {
        if (locations.hasOwnProperty(key)) {
            let icon = {};
            switch (key) {
                case 'completedTasks':
                    icon = {
                        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    }
                    break;
                case 'unassignedTasks':
                    icon = {
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    }
                    break;
                case 'assignedTasks':
                    icon = {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }
                    break;
                case 'offlineMechanics':
                    icon = {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#D8D6D4',
                        fillOpacity: 1,
                        strokeColor: '#D8D6D4',
                        strokeOpacity: 0.9,
                        strokeWeight: 1,
                        scale: 7
                    };
                    break;
                case 'freeMechanics':
                    icon = {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#0E9AFF',
                        fillOpacity: 1,
                        strokeColor: '#0E9AFF',
                        strokeOpacity: 0.9,
                        strokeWeight: 1,
                        scale: 7
                    };
                    break;
                case 'busyMechanics':
                    icon = {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: '#3A9C2D',
                        fillOpacity: 0.6,
                        strokeColor: '#3A9C2D',
                        strokeOpacity: 0.9,
                        strokeWeight: 1,
                        scale: 7
                    };
                    break;
                default:
                    break;
            }

            for (i = 0; i < locations[key].length; i++) {
                const latLng = new google.maps.LatLng(locations[key][i].lat, locations[key][i].lng)
                marker = new google.maps.Marker({
                    position: latLng,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    icon: icon
                });
                marker.setMap(map);
                bounds.extend(latLng);
                markers.push(marker);
            }
            map.fitBounds(bounds);
        }
    }
    
}


resizeMap = () => {
    let paddingLeft = 0;
    let paddingRight = 0;
    let mapSection = document.getElementById('mapSection');
    const customerSidebar = document.querySelector("#customerSidebar");
    const serviceSidebar = document.querySelector("#serviceSidebar");
    customerSidebar.classList.contains("customerSide") ? paddingLeft = 400 : paddingLeft = 0;
    serviceSidebar.classList.contains("serviceSide") ? paddingRight = 400 : paddingRight = 0;
    mapSection.style.paddingRight = paddingRight + 'px';
    mapSection.style.paddingLeft = paddingLeft + 'px';
}

hideSideBar = (id) => {
    const element = document.querySelector(id);
    const className = (id === '#serviceSidebar' ? 'serviceSide' : 'customerSide');
    element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className);
    setTimeout(function() {
        resizeMap();
    });
}

filterHandler = (id) => {
    const element = document.getElementById(id);
    element.checked ? filterMarkers(id, 1) : filterMarkers(id, 0);
}

filterMarkers = (id, type) => {
    const locs = { ...locations };
    const clusters_local = { ...clusters };
    switch (id) {
        case 'hideCompletedTasks':
            type ? delete locs['completedTasks'] : '';
            initMarkers(locs);
            break;
        case 'showTasksClusters':
            type ? delete clusters_local['mechanicClusters'] : '';
            initMarkers(clusters_local);
            break;
        case 'showMechanicsClusters':
            type ? delete clusters_local['tasksClusters'] : '';
            initMarkers(clusters_local);
            break;
        case 'hideOfflineMechanics':
            type ? delete locs['offlineMechanics'] : '';
            initMarkers(locs);
            break;
        case 'hideBusyMechanics':
            type ? delete locs['busyMechanics'] : '';
            initMarkers(locs);
            break;
        case 'showDarkMap':

            break;
        case 'showWebNotifications':

            break;
        default:
            break;
    }
    
}
