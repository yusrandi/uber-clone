import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView ,{Marker} from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../redux/slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { MAP_API_KEY } from '../constant';


export default function MapComponent() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  const mapRef = useRef(null);

  useEffect(()=> {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"],{
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
    });
  }, [origin, destination]);

  useEffect(()=> {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const URL = fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}
      &destinations=${destination.description}&key=${MAP_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
      ;
    }

    getTravelTime();
  }, [origin, destination, MAP_API_KEY]);



  return (
    <MapView
        ref={mapRef}
        className="flex-1"
        mapType='mutedStandard'
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    >

        {
            origin && destination && (
                <MapViewDirections
                    origin={{ 
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                     }}
                    destination={{ 
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                     }}
                    apikey={MAP_API_KEY}
                    strokeWidth={3}
                    strokeColor={'black'}
                />
            )
        }

      {
        origin?.location && (
          <Marker
            coordinate={{ 
              latitude: origin.location.lat,
              longitude: origin.location.lng,
             }}
             title="Origin"
             description={origin.description}
             identifier='origin'
          />
        )
      }
      {
        destination?.location && (
          <Marker
            coordinate={{ 
              latitude: destination.location.lat,
              longitude: destination.location.lng,
             }}
             title="Destination"
             description={destination.description}
             identifier='destination'
          />
        )
      }
    </MapView>
  )
}