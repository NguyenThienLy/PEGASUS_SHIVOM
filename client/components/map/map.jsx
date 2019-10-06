import React, { Component } from "react";
import "./map.scss";

export class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    // const map = new window.google.maps.Map(
    // document.getElementById(this.props.id),
    // this.props.options
    // );
    // this.props.onMapLoad(map);
    var platform = new H.service.Platform({
      apikey: 'd_VnWv0PGQm-vbE8hVqqDZMnf8k8fx1uEdxuS0tx8oo'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('map'),
      maptypes.vector.normal.map,
      {
        zoom: 15,
        center: { lng: 105.9701969, lat: 21.3518757 }
      });
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, maptypes);
  }

  componentDidMount() {
    this.onScriptLoad()
    // if (!window.google) {
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
    // var x = document.getElementsByTagName("script")[0];
    // x.parentNode.insertBefore(s, x);
    // // Below is important.
    // //We cannot access google.maps until it's finished loading
    // s.addEventListener("load", e => {
    // this.onScriptLoad();
    // });
    // } else {
    // this.onScriptLoad();
    // }
  }

  render() {
    return <div style={{
      "width": "100%",
      "height": "480px"
    }} id="map"></div>
    // return <div className="map" id={this.props.id} />;
  }
}