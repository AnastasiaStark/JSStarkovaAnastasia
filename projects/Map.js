// readyymaps.ready(init);
//
// function init() {
//   let map = new ymaps.Map('map', {
//     center: [55.45, 37.36],
//     zoom: 12,
//     controls: ['zoomControl'],
//     behavior: ['drag']
//   });

export default class InteractiveMap {
  constructor(mapId, onClick) {
    this.mapId = mapId;
    this.OnClick = onClick;
  }

  async init() {
    await this.MapsScript();
    await this.loadYMaps();
    this.initMap();
  }

  MapsScript() {
    return new Promise(resolve => {
      const yamapsScripts = document.createElement('script');
      yamapsScripts.scr = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      yamapsScripts.addEventListener('load', resolve);
    });
  }

  loadYMaps() {
    return new Promise(resolve =>
      ymaps.ready(resolve));
  }

  initMap() {
    this.clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.map = new ymaps.Map(this.mapId, {
      center: [55.76, 37.64],
      zoom: 10,
    });
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
    this.map.geoObjects.add(this.clusterer);
  }
}

