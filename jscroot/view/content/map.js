import {setInner} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.2/croot.js";
//map
import {map} from '../../controller/map/config.js';
import {onClosePopupClick,onMapPointerMove,disposePopover,onMapClick} from '../../controller/map/popup.js';
import {onClick} from '../../controller/map/element.js';

import {get} from '../../controller/map/api.js';
import { xxx } from '../../controller/map/template.js';
import { MakeGeojsonFromAPI, AddLayerToMAP } from '../../controller/map/controller.js';

export function main(){
    setInner("biggreet","");
}

onClick('overlay-closer',onClosePopupClick);

map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
map.on('click', onMapClick);

get(xxx,result => {
    let link = MakeGeojsonFromAPI(result)
    console.log(result)
    AddLayerToMAP(link)
});