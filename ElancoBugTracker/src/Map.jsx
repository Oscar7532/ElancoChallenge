import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
// imports the map library for react leaflet

import useSWR from "swr";
//import fetchWithToken from "swr";
// imports swr for get methods

import {useEffect} from 'react';
import './Map.css'
import places from './assets/places.json'

function FixMapRender() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize()
        }, 200)
    }, [map])
    return null;
}

function useGetTicks() {
    // retrieves the json object of all ticks from the api
    // note that the use indicates a hook
    const url = "https://dev-task.elancoapps.com/data/tick-sightings"
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const {data, error, isLoading} = useSWR(url, fetcher);

    if (error) {
        return {ticks: null, loading: false, error: error};
    }

    if (isLoading) {
        return {ticks : null, loading : true, error : false};
    }

    if (data.length < 0) {
        return {ticks : null, loading : false, error : "Coordinates not found"};
    }
    return {ticks : data, loading : false, error : false};
}

function CreatePoints({ticks}){
    let points = []
    for (let i=0; i<ticks.length; i++){
        const {coords} = getCoordinates(ticks[i].location);
        // retrieves the coordinate for the scpecific location of that tick
        // NOTE: the api descriptions says the location key is “city” however it is actually “location”.
        points.push(coords);
    }
    return points;
}

// function useGetCoordinates({name}) {
//     // takes the name provided and uses open weather maps' Geocoding API to find the coordinate of that named location
//     // note that the use indicates a hook
//     // note that the appid has been disabled and is no longer valid
//     const url = "http://api.openweathermap.org/geo/1.0/direct"
//     // constructs the paramters required to access the api, and the data to be processed.
//     const tokens = {q : name, country : "GB", limit : 1, appid : "1dff8a44e9cbdfa8b7619954734e7045"}
//     const tokenedUrl = url + `?q=${tokens["q"]},${tokens["country"]}&limit=${tokens["limit"]}&appid=${tokens["appid"]}`;
//     const fetcher = (...args) => fetch(...args).then((res) => res.json());
//     const {data, error, isLoading} = useSWR(tokenedUrl, fetcher);
//
//     if (error) {
//         return {coords: null, loading: false, error: error};
//     }
//
//     if (isLoading) {
//         return {coords : null, loading : true, error : false};
//     }
//
//     if (data.length < 0) {
//         return {coords : null, loading : false, error : "Coordinates not found"};
//     }
//
//     return {coords : [data[0].lat, data[0].lon], loading : false, error : false};
// }

function getCoordinates(name){
    // takes the name provided and cross referances it against the local json file to find that location
    let data = places[name];
    const offset = 0.02
    if (data == null) { data = [54.0021959912, -2.54204416515]} // checks that the coordinates were found,
    // if not they are then set to the center of the UK.
    data[0] += offset - (Math.random() * (2 * offset));
    data[1] += offset - (Math.random() * (2* offset));
    // sets a random offset of up to +/- offset to each coordinate to prevent them from stacking on top of each other.
    return {coords : [data[0], data[1]], loading : false, error : false};
}

function MakeMarkers({ticks}) {
    // calls the coordinate conversions to gather the coordinates of the ticks
    // iterates though every tick in the ticks object and creates a new marker at its new respective coordinates.
    const coords = CreatePoints({ticks});
    return ticks.map((tick, i) => (
        <Marker position={coords[i]}>
            <Popup>
                Info about the tick<br/>
                more info
            </Popup>
        </Marker>
    ));
}

function Map() {

    let {ticks, loading, error} = useGetTicks();

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
                    {!loading && ticks && !error &&(
                        <>
                            {/* generates all the Markers on the map */}
                            <MakeMarkers ticks = {ticks} />
                        </>
                    )}
                </MapContainer>
            </div>
        </>
    );
}
export default Map