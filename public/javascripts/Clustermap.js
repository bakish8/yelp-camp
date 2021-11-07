
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bakish/ckv9dkcevafau14s7poorderx',
    center: [34.652488088972646,31.804250496084997],
    zoom: 8
});

console.log(campgrounds)
map.addControl(new mapboxgl.NavigationControl());



map.on('load', function () {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
console.log(campgrounds)

    map.addSource('campgrounds', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#00BCD4',
                10,
                '#2196F3',
                30,
                '#3F51B5'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                25,//pixels
                10,// num camps
                30,
                30,
                35
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 10,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
const { popUpMarkup } = e.features[0].properties;            
const { popUpMarkupTitle } = e.features[0].properties;    
const { popUpMarkuplocation } = e.features[0].properties;    
const { popUpMarkupdescrip } = e.features[0].properties;    
const { popUpMarkupPIC } = e.features[0].properties;    



        const coordinates = e.features[0].geometry.coordinates.slice();
 
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
 
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h5><a href="/campgrounds/${popUpMarkup}">${popUpMarkupTitle}</a></h5><br><h1 style="font-size:15px;">${popUpMarkuplocation}</h3><br><img width="150" height="150" src="${popUpMarkupPIC}" alt=""></img>
<br><p>${popUpMarkupdescrip}</p>`) //זה הפופאפ שמציג את הקישור והתמונה 
            .addTo(map);
    });
//.setHTML('<h3><a href="' + feature.properties.URL + '">' + feature.properties.Company + '</a></h3>')
    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
});

