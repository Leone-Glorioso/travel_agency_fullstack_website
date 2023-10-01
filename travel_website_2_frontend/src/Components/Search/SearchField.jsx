import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import React, {useEffect, useState} from "react";
import L from "leaflet";
import FilterWindow from "./FilterWindow";
{
    /* <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet-geosearch@3.7.0/assets/css/leaflet.css"
  /> */
}
const SearchField = (props) => {
    const map = useMap();

    const eventHandler = (result) =>
    {
        props.setLat(result.location.y)
        props.setLong(result.location.x)
        props.setFlags('location')
        console.log(FilterWindow.latitude, FilterWindow.longitude)
    }


    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider: props.provider,
            style: "bar",
            marker: {
                icon: new L.icon({
                    iconUrl:
                        "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40]
                })
            },
            autoComplete: true, // optional: true|false  - default true
            autoCompleteDelay: 250, // optional: number      - default 250
            ...props
        });
        map.on('geosearch/showlocation', eventHandler)
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map, props]);

    return null;
};
export default SearchField;