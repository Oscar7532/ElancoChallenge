import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
// imports the map library for react leaflet

import useSWR from "swr";
//import fetchWithToken from "swr";
// imports swr for get methods

import {useEffect} from "react";
import './Map.css'

function FixMapRender() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize()
        }, 200)
    }, [map])
    return null;
}
//
// function CreatePoints({bugs}){
//     let coords = []
//     for (let i=0; i<bugs.length; i++){
//         const {data, loading, error} = useGetCoordinates(bugs[i]));
//         coords.push(data);
//     }
//     return coords;
// }

function useGetCoordinates({name}) {
    // note that the use indicates a hook
    const url = "http://api.openweathermap.org/geo/1.0/direct"
    const tokens = {q : name, country : "GB", limit : 1, appid : "1dff8a44e9cbdfa8b7619954734e7045"}
    const tokenedUrl = url + `?q=${tokens["q"]},${tokens["country"]}&limit=${tokens["limit"]}&appid=${tokens["appid"]}`;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const {data, error, isLoading} = useSWR(tokenedUrl, fetcher);

    if (error) {
        return {coords: null, loading: false, error: error};
    }

    if (isLoading) {
        return {coords : null, loading : true, error : false};
    }

    if (data.length < 0) {
        return {coords : null, loading : false, error : "Coordinates not found"};
    }

    return {coords : [data[0].lat, data[0].lon], loading : false, error : false};
}

function Map() {

    let {coords, loading, error} = useGetCoordinates({name : "Edinburgh"})

    return (

        <>
            <div id="map">
                <MapContainer center={[54.8, -4]} zoom={5.5} scrollWheelZoom={true}>
                    <FixMapRender />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* ensures that the map isn't loaded until all coordinates are loaded. */}
                    {!loading && coords && !error &&(
                            <Marker position={coords}>
                                <Popup>
                                    A pretty CSS3 popup. <br/> Easily customizable.
                                </Popup>
                            </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </>
    );
}
export default Map