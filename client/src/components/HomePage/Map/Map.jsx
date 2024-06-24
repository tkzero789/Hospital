import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapConfig } from "./MapConfig";
import LocationIcon1 from "assets/icons/location-small-icon.png";
import LocationIcon3 from "assets/icons/location-big-icon.png";
import "components/HomePage/Map/Map.scss";

const Map = () => {
  const [radius1, setRadius1] = useState("6px");
  const [radius2, setRadius2] = useState("6px");
  const [mapHeight, setMapHeight] = useState("600px");

  // Set border-radius for different breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setRadius1("0px");
        setRadius2("6px");
        setMapHeight("440px");
      } else {
        setRadius1("6px");
        setRadius2("0px");
        setMapHeight("600px");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the radius based on the initial window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MapConfig.googleMapApiKey,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const containerStyle = {
    width: "100%",
    height: mapHeight,
  };

  const center = {
    lat: 27.9517,
    lng: -82.4588,
  };

  const markers = [
    {
      location: "AdventHealth Carrollwood Hospital",
      address: "7171 N Dale Mabry Hwy, Tampa, FL 33614",
      coordinates: {
        lat: 28.014206412989203,
        lng: -82.50373275421117,
      },
    },

    {
      location: "St. Joseph's Hospital",
      address: "3001 W Dr Martin Luther King Jr Blvd, Tampa, FL 33607",
      coordinates: {
        lat: 27.982031756034292,
        lng: -82.49037252203598,
      },
    },
    {
      location: "Tampa General Hospital",
      address: "1 Tampa General Cir, Tampa, FL 33606",
      coordinates: {
        lat: 27.93799443224753,
        lng: -82.46004554024331,
      },
    },
  ];

  const onChangeSelect = (e) => {
    const selectedLocation = e.target.value;
    const marker = markers.find(
      (marker) => marker.location === selectedLocation
    );
    setSelectedMarker(marker);
  };

  return (
    isLoaded && (
      <>
        <section className="map w-100">
          <div className="content-container">
            <div className="map__wrapper">
              <div className="c-4 md-12">
                <div className="map__left">
                  <div className="map__left-wrapper">
                    <div className="map__left-select">
                      <h5>Find Locations</h5>
                      <select onChange={onChangeSelect}>
                        <option value="">Select location</option>
                        {markers.map((marker) => {
                          return (
                            <option
                              key={marker.coordinates.lat}
                              value={marker.location}
                            >
                              {marker.location}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="map__left-newsletter">
                      <h5>
                        Subscribe to BaySide Hospital's newsletter for the
                        latest health updates!
                      </h5>
                      <input type="text" placeholder="Enter your email" />
                    </div>
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
              <div className="c-8 md-12">
                <GoogleMap
                  zoom={11}
                  center={center}
                  mapContainerStyle={{
                    ...containerStyle,
                    borderTopRightRadius: radius1,
                    borderBottomRightRadius: "6px",
                    borderBottomLeftRadius: radius2,
                  }}
                  options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                  }}
                >
                  {markers.map((map) => {
                    return (
                      <Marker
                        key={map.location}
                        position={map.coordinates}
                        onClick={() => {
                          setSelectedMarker(map);
                        }}
                        options={{
                          icon: {
                            url:
                              selectedMarker &&
                              selectedMarker.location === map.location
                                ? LocationIcon3
                                : LocationIcon1,
                          },
                        }}
                      ></Marker>
                    );
                  })}

                  {selectedMarker && (
                    <div className="location__info">
                      <div className="location__info-wrapper">
                        <h6>{selectedMarker.location}</h6>
                        <p>
                          <i className="bi bi-geo-fill"></i>
                          {selectedMarker.address}
                        </p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.coordinates.lat},${selectedMarker.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-geo-alt-fill"></i>Directions
                        </a>
                        <button onClick={() => setSelectedMarker(null)}>
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </GoogleMap>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default Map;
