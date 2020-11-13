import interactiveMap from './Map'
import construct from '@babel/runtime/helpers/esm/construct';



export default class geoRevies {
  constructor() {
    this.map = new InteractiveMap('map', this.onClick.bing(this));
    this.map.init().then(this.onInit.bing(this));
  }
}
