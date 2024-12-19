var landsat8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
.filterBounds(COX)
.filterDate("2020-10-10", "2021-03-03")
.filterMetadata('CLOUD_COVER','less_than', 1 )
.mean()
.clip(COX);
var nir = landsat8.select('B5');
var red = landsat8.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red).rename('NDVI'));
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi,ndviParams, 'NDVI Image');
Export.image.toDrive({
    image: ndvi,
  description: 'NDVI_RUMA',
  scale:30,
  maxPixels: 500000000,
  region: COX
});
