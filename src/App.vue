<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />
    <div class="wrapper">
      <h1>Vue3 + OpenLayers</h1>
    </div>
  </header>

  <main>
    <div ref="mapRoot" class="map" @mousemove="moveMouseOnMap"></div>
    <div class="my-3">
      <button type="button" class="btn btn-success" @click="getMapInstance">讀取 MapInstance</button>
      <button type="button" class="btn btn-info ms-3" @click="setCenterToTokyo">中心至東京</button>
    </div>
  </main>
</template>

<script>
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';

export default {
  data() {
    return {
      mapInstance: null,
    };
  },
  methods: {
    getMapInstance() {
      console.log('Map:', this.mapInstance);
      console.log('getAllLayers:', this.mapInstance.getAllLayers());
      console.log('getView:', this.mapInstance.getView());
      console.log(`getViewProjection:`, this.mapInstance.getView().getProjection());
    },
    setCenterToTokyo() {
      const vm = this;
      const Tokyo = fromLonLat([139.45, 35.4]);
      vm.mapInstance.getView().setCenter(Tokyo);
    },
    moveMouseOnMap() {
      // console.log('moving');
    },
  },
  mounted() {
    const vm = this;
    const Taipei = fromLonLat([121.6, 25.1]);
    vm.mapInstance = new Map({
      // the map will be created using the 'map-root' ref
      target: this.$refs.mapRoot,
      layers: [
        // adding a background tiled layer
        new TileLayer({
          source: new OSM(), // tiles are served by OpenStreetMap
        }),
      ],

      // the map view will initially show the whole world
      view: new View({
        zoom: 10,
        center: Taipei,
        constrainResolution: true,
      }),
    });
    vm.mapInstance.on('click', function (event) {
      console.log('clicking on:', event.coordinate);
    });
    vm.mapInstance.getView().on('change:resolution', function (event) {
      const zoomLevel = vm.mapInstance.getView().getZoom();
      console.log('current zoom level:', zoomLevel);
    });
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  width: 125px;
  height: 125px;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
