import { toLonLat } from 'https://cdn.skypack.dev/ol/proj.js';
import { overlay, map, popupinfo } from './config.js';
import { clickpopup, aaa, bbb, ccc } from './template.js';
import { setInner, setValue } from './element.js';
import { getCookie } from './cookie.js';

export function onClosePopupClick() {
    overlay.setPosition(undefined);
}

export function popupInputMarker(evt, type, coordinates) {
    let tile = evt.coordinate;
    let name = document.getElementById('inputname');
    let msg = clickpopup.replace("#COORDINATE#", coordinates).replace("#TYPE#", type);
    setInner('popup-content', msg);
    setValue('koordinattt', coordinates);
    overlay.setPosition(tile);


        
    let insertmarkerbutton = document.getElementById('insertmarkerbutton');
    insertmarkerbutton?.addEventListener('click', async () => {
        const token = getCookie('token')        
        let data = {
            "type": "Feature",
            "properties": {
            "name": name.value
            },
            "geometry": {
            "type": type,
            "coordinates": coordinates
            }
        }
        
        if (type === 'Point') {
            try {
                const response = await fetch(aaa, {
                    method: 'POST',
                    body: JSON.stringify(data), // Send the data object, not individual variables
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
    
                const responseData = await response.json()
                if (responseData.status === false) {
                    console.log(responseData.message)
                } else {
                    console.log(responseData.message)
                    window.location.reload()
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else if (type === 'LineString') {
            try {
                const response = await fetch(bbb, {
                    method: 'POST',
                    body: JSON.stringify(data), // Send the data object, not individual variables
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
    
                const responseData = await response.json()
                if (responseData.status === false) {
                    console.log(responseData.message)
                } else {
                    console.log(responseData.message)
                    window.location.reload()
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else if (type === 'Polygon') {
            try {
                const response = await fetch(ccc, {
                    method: 'POST',
                    body: JSON.stringify(data), // Send the data object, not individual variables
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
    
                const responseData = await response.json()
                if (responseData.status === false) {
                    console.log(responseData.message)
                } else {
                    console.log(responseData.message)
                    window.location.reload()
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    })
}

function popupGetMarker(evt, features) {
    let title = features.get('name');
    setInner('popupinfo-title',title);
    let ctnt = "type : " + features.getGeometry().getType() + "<br>XY : " + toLonLat(evt.coordinate);
    setInner('popupinfo-content', ctnt);
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