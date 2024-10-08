/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env mocha */
const accessToken = "1234";
const basemapStyleBeta = 'beta/arcgis/outdoor';
const basemapStyleBetaNoSlash = 'beta/arcgis/outdoor';
const basemapStyle = '/arcgis/outdoor'
const languageCode = 'fr';

const imageryLabels = 'beta/arcgis/imagery/labels'

describe('StaticBasemapTileLayer', () => {
    it('should save the style enumeration from the constructor - basemapStyle', function () {
        const layer = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta, {token:accessToken});
    
        expect(layer.options.style).to.equal(basemapStyleBeta);
    });
    it('should accept a language parameter - languageCode', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta, {token:accessToken, language:languageCode});
    
      expect(layer.options.language).to.equal(languageCode);
    });
    it('should support the token parameter and propagate to the outdated apikey param - accessToken', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta, {token:accessToken});
      expect(layer.options.token).to.equal(accessToken);
      expect(layer.options.apikey).to.equal(accessToken);
    });
    it('should support the apikey param and alternate spelling apiKey - accessToken', function () {
      const layer1 = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta, {apikey:accessToken});
      expect(layer1.options.token).to.equal(accessToken);
      expect(layer1.options.apikey).to.equal(accessToken);

      const layer2 = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta, {apiKey:accessToken});
      expect(layer2.options.token).to.equal(accessToken);
      expect(layer2.options.apikey).to.equal(accessToken);
    });
    it('should error if no style code is provided', function () {
      expect(function () {
        L.esri.Static.staticBasemapTileLayer('',{token:accessToken});
      }).to.throw('A valid style enum is required for staticBasemapTileLayer (e.g. \'beta/arcgis/streets\').');
    });
    it('should error if the style code does not begin with \'beta\'', function () {
      expect(function () {
        L.esri.Static.staticBasemapTileLayer(basemapStyle,{token:accessToken});
      }).to.throw('The basemap styles service is currently in beta. All style enums must begin with \'beta\' (e.g. \'beta/arcgis/outdoor\').');
    })
    it('should error if no access token is provided', function () {
      expect(function () {
        L.esri.Static.staticBasemapTileLayer(basemapStyleBeta);
      }).to.throw('An ArcGIS access token is required for static basemap tiles. To learn more, go to https://developers.arcgis.com/documentation/security-and-authentication/');
    });
    it('should create static tiles in the \'tilePane\' by default', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta,{token:accessToken});
      expect(layer.options.pane).to.equal('tilePane');
    });
    it('should save the pane from the constructor', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(basemapStyleBeta,{token:accessToken,
        pane:'test-pane'
      });
      expect(layer.options.pane).to.equal('test-pane');
    });
    it('should set the pane to \'esri-labels\' for styles ending in \'\/labels\'', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(imageryLabels,{token:accessToken});
      expect(layer.options.pane).to.equal('esri-labels');
    });
    it('should override the \'esri-labels\' pane if a custom pane is provided for a style ending in \'\/labels\'', function () {
      const layer = L.esri.Static.staticBasemapTileLayer(imageryLabels,{token:accessToken,
        pane:'tilePane'
      });
      expect(layer.options.pane).to.equal('tilePane');
    });
})