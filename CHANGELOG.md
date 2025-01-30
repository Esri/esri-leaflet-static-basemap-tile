# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Upcoming changes][unreleased]


## 1.0.0

### Breaking

* `L.esri.Static.staticBasemapTileLayer` now references the v1 URL of Esri's [Static basemap tiles service](https://developers.arcgis.com/rest/static-basemap-tiles/)
* Style enumerations may no longer begin with `beta/`. For example, the ArcGIS Outdoor static basemap enumeration is now `arcgis/outdoor` instead of `beta/arcgis/outdoor`.

## 1.0.0-beta.2

### Fixed

* Fixed an issue where "Powered by Esri" attribution no longer displayed properly on static basemap tiles ([#2](https://github.com/Esri/esri-leaflet-static-basemap-tile/issues/2))

## 1.0.0-beta.1

* Initial release