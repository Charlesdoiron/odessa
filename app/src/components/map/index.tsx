import React from "react";
import GoogleMapReact from "google-map-react";

interface Props {
  text: string;
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<Props> = ({ text, lat, lng }) => (
  <div>{text}</div>
);

export const Map: React.FC = () => {
  const defaultProps = {
    center: {
      lat: 48.856614,
      lng: 2.3522219,
    },
    zoom: 6,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};
