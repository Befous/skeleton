import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {overlay,map,popupinfo} from './config.js';
import {clickpopup} from './template.js';
import {setInner,setValue} from './element.js';

export function onClosePopupClick() {
    overlay.setPosition(undefined);
}

function popupInputMarker(evt) {
    let tile = evt.coordinate;
    let coordinate = toLonLat(tile);
    let msg = clickpopup.replace("#LONG#",coordinate[0]).replace("#LAT#",coordinate[1]);
    setInner('popup-content',msg);
    setValue('long',coordinate[0]);
    setValue('lat',coordinate[1]);
    overlay.setPosition(tile);
}

function popupGetMarker(evt,features) {
    let title = features.get('name');
    setInner('popupinfo-title',title);
    let ctnt = "type : "+features.getGeometry().getType()+"<br>XY : "+toLonLat(evt.coordinate);
    setInner('popupinfo-content',ctnt);
    popupinfo.setPosition(evt.coordinate);
}

export function onMapPointerMove(evt) {
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
}

export function disposePopover() {
    if (overlay && popupinfo) {
        overlay.setPosition(undefined);
        popupinfo.setPosition(undefined);
    }
}

export function onMapClick(evt) {
    let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
    if (!feature) {
        popupInputMarker(evt);
        return;
    } else {
        popupGetMarker(evt,feature);
    }
}