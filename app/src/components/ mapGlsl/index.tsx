import * as React from "react";
import { useState, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import { useParams, useSearchParams } from "react-router-dom";

import Pin from "./pin";
import { ConvoyType } from "typings";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const LAT = 48.856614;
const LONG = 2.3522219;

type PopupInfo = {
  longitude: number;
  latitude: number;
  image: string;
  pickupName: string;
  availableSeat?: number;
  availableVolume: number;
  status: ConvoyType["status"];
};

interface Props {
  data: ConvoyType[];
  zoom?: number;
  noSearchOnDrag?: boolean;
}

export const CustomMap: React.FC<Props> = ({ data, zoom, noSearchOnDrag }) => {
  const { id } = useParams<{ id: string }>();
  const [, setSearchParams] = useSearchParams();

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const mapRef = React.useRef<any>();

  const handleDrag = (e: {
    viewState: { longitude: number; latitude: number };
  }) => {
    if (!e) return;
    if (noSearchOnDrag) return;
    const { longitude, latitude } = e.viewState;
    setTimeout(() => {
      setSearchParams({ location: `${longitude}%${latitude}` });
    }, 700);
  };

  const pins = useMemo(
    () =>
      data?.map(
        ({
          _id,
          pickupGeometry,
          pickupName,
          availableVolume,
          availableSeat,
          status,
        }) => {
          if (!pickupGeometry) return null;
          const longitude = pickupGeometry.coordinates[0];
          const latitude = pickupGeometry.coordinates[1];
          return (
            <Marker
              key={`marker-${_id}`}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
            >
              <Pin
                onClick={() =>
                  setPopupInfo({
                    longitude,
                    latitude,
                    image: "https://source.unsplash.com/random",
                    pickupName,
                    availableSeat,
                    availableVolume,
                    status,
                  })
                }
              />
            </Marker>
          );
        }
      ),
    [data]
  );

  React.useEffect(() => {
    const coordinates = data?.map((c) => c?.pickupGeometry?.coordinates)[0];
    if (!coordinates || !id) return;

    setTimeout(() => {
      mapRef.current?.flyTo({
        center: [coordinates[0], coordinates[1]],
        duration: 5000,
        zoom: 15,
      });
    }, 100);
  }, [id, data]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: LAT,
          longitude: LONG,
          zoom: zoom ? zoom : 10,
          bearing: 0,
          pitch: 60,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        onDrag={(e) => handleDrag(e)}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>{popupInfo.pickupName}</div>
            <img width="100%" src={popupInfo.image} alt="" />
            {popupInfo.availableSeat && (
              <p>{popupInfo.availableSeat} places disponibles</p>
            )}
            <p>{popupInfo.availableVolume} m3 disponibles dans le véhicule</p>
          </Popup>
        )}
      </Map>
    </>
  );
};
