import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.2/croot.js";
//map
import { map } from '../../controller/map/config.js';
import { onClosePopupClick, onMapPointerMove, disposePopover, onMapClick } from '../../controller/map/popup.js';
import { onClick } from '../../controller/map/element.js';

import { get } from '../../controller/map/api.js';
import { xxx } from '../../controller/map/template.js';
import { MakeGeojsonFromAPI, AddLayerToMAP } from '../../controller/map/controller.js';

export function main(){
    setInner("biggreet", "");
}

onClick('overlay-closer', onClosePopupClick);
onClick('popupinfo-closer', onClosePopupClick);

const typeSelect = document.getElementById('type');
const styles = {
    Point: {
      'circle-radius': 5,
      'circle-fill-color': 'orange',
    },
    LineString: {
      'circle-radius': 5,
      'circle-fill-color': 'red',
      'stroke-color': 'red',
      'stroke-width': 1.5,
    },
    Polygon: {
      'circle-radius': 5,
      'circle-fill-color': 'blue',
      'stroke-color': 'blue',
      'stroke-width': 2,
      'fill-color': 'blue',
    },
};

let draw; // global so we can remove it later
let layer;
let value = typeSelect.value; // Move the variable definition here

function addInteraction() {
    // Remove the previous interaction and event listeners
    map.removeInteraction(draw);
    map.un('pointermove', onMapPointerMove);
    map.un('movestart', disposePopover);
    map.un('click', onMapClick);
    
    if (value !== 'None') {
        const source = new ol.source.Vector();

        draw = new ol.interaction.Draw({
            source: source,
            type: value,
        });
    
        layer = new ol.layer.Vector({
            source: source,
            style: styles[value],
        });
    
        map.addLayer(layer);
        map.addInteraction(draw);
    
        document.getElementById('undo').addEventListener('click', function () {
            draw.removeLastPoint();
        });
    } else {
        map.on('pointermove', onMapPointerMove);
        map.on('movestart', disposePopover);
        map.on('click', onMapClick);
    }
}

typeSelect.onchange = function () {
    value = typeSelect.value;
    map.removeInteraction(draw);
    addInteraction();
};

get(xxx, result => {
    let link = MakeGeojsonFromAPI(result)
    AddLayerToMAP(link)
});