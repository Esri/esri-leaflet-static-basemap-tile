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
import { request } from 'esri-leaflet';

// URL of the static basemap tiles service
const baseUrl =
  'https://static-map-tiles-api.arcgis.com/arcgis/rest/services/static-basemap-tiles-service/v1/';

/**
 * Utility to establish a URL for the static basemap tiles API
 *
 * @param {string} style
 * @param {string} accessToken
 * @param {Object} [options] Optional list of parameters: language and worldview.
 * @returns {string} the URL
 */
export function getStaticBasemapTilesUrl (style, accessToken, options) {
  if (!accessToken) {
    throw new Error(
      'An access token is required to access the static basemap tiles service.'
    );
  }

  const serviceUrl = options.baseUrl || baseUrl;

  // Tile endpoint in {z}/{y}/{x} format
  let url =
    serviceUrl + style + '/static/tile/{z}/{y}/{x}?token=' + accessToken;

  // language is not supported with a valid worldview parameter
  if (
    options.worldview &&
    options.worldview === 'unitedStatesOfAmerica' &&
    options.language
  ) {
    console.warn(
      "esri-leaflet-static-basemap-tile: The 'language' parameter is not supported with the 'worldview' parameter. The 'language' parameter will be ignored."
    );
  }

  // The only valid world view is "unitedStatesOfAmerica"
  if (options.worldview && options.worldview !== 'unitedStatesOfAmerica') {
    console.warn(
      "esri-leaflet-static-basemap-tile: Invalid worldview parameter. Supported values are 'unitedStatesOfAmerica' or undefined. The 'worldview' parameter will be ignored."
    );
  }

  // Handle additional service parameters
  if (options.language) {
    url += '&language=' + options.language;
  }

  // Handle additional service parameters
  if (options.worldview) {
    url += '&worldview=' + options.worldview;
  }

  return url;
}

/**
 * Utility that retrieves attribution data for a given style
 * @param {string} style
 * @param {string} accessToken
 * @returns The attribution data from the '/static' endpoint of a style enumeration
 */
export async function fetchAttribution (options) {
  const { style, token } = options;
  const attributionUrl = (options.baseUrl || baseUrl) + style + '/static';
  return new Promise((resolve, reject) => {
    request(attributionUrl, { token }, (error, resp) => {
      if (error) reject(error);
      resolve(resp.copyrightText);
    });
  });
}

/**
 * Utility to make a /self request to the static basemap tiles service
 * @param {string} accessToken
 * @returns {Object} A list of all supported basemap styles, including thumbnail URLs and supported language codes.
 */
export async function getSelf (accessToken) {
  if (!accessToken) {
    throw new Error(
      'An access token is required to access the static basemap tiles service.'
    );
  }

  const selfUrl = baseUrl + 'self';
  return new Promise((resolve, reject) => {
    request(selfUrl, { token: accessToken }, (error, resp) => {
      if (error) reject(error);
      resolve(resp);
    });
  });
}

export const EsriUtil = {
  getSelf: getSelf
};

export default EsriUtil;
