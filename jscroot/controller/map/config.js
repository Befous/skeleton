import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import {fromLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import Overlay from 'https://cdn.skypack.dev/ol/Overlay.js';
import {container} from 'https://jscroot.github.io/element/croot.js';

const attributions = '<a href="https://befous.github.io/" target="_blank">&copy; Befous Indonesia</a> ';

const place = [103.61061534308766, -1.6272725906014358];

const basemap = new TileLayer({
    source: new OSM({
        attributions: attributions,
    }),
});

const defaultstartmap = new View({
    center: fromLonLat(place),
    zoom: 13.2,
});

export const overlay = new Overlay({
    element: container('popup'),
    autoPan: {
        animation: {
        duration: 250,
        },
    },
  });

export const popupinfo = new Overlay({
    element: container('popupinfo'),
    autoPan: {
        animation: {
        duration: 250,
        },
    },
});

export let map = new Map({
    layers: [
        basemap
    ],
    overlays: [overlay,popupinfo],
    target: 'map',
    view: defaultstartmap,
});