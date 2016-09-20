var development = {
  
  server: {
    port: process.env.NODE_PORT || 3000, 
  },
  geoavalanche: {
    auth: 'admin:geoserver',
    featureNS: 'geoavalanche',
    featureType: 'geoavalanche_features',
    geometryName: 'the_geom',
    srsName: 'EPSG:3857',
    urlwfs: 'http://' + (process.env.APP_GASERV_HOST || 'localhost') + ':8080/geoavalanche/wfs?',
    urlwps: 'http://' + (process.env.APP_GASERV_HOST || 'localhost') + ':8080/geoavalanche/ows?strict:true'
  },
  mapzen: {
    url: 'https://search.mapzen.com/v1/search?api_key=search-PBce8si&text='
  }
};

module.exports = development;