// app/components/MapComponent.tsx
"use client"; // Ensure this component is client-side rendered

import { useEffect, useRef } from "react";
import { Map } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css"; // Import MapTiler styles

const MapComponent: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null); // Ref for the map container div
    const map = useRef<Map | null>(null); // Ref to store the map instance

    useEffect(() => {
        // Initialize the map only on the client side
        if (!mapContainer.current) return(console.log("fsfkdflj")); // Ensure the ref is available

        try {
            map.current = new Map({
                container: mapContainer.current, // The div where the map will render
                style: "01973749-e1d5-7663-97d1-d75326b2eca6", // Your map style ID
                apiKey: "7sr2j0QXsgtmt3qjyToI", // Your API key
                center: [78.363, 11.097], // [longitude, latitude] from the URL
                zoom: 6.09, // Zoom level from the URL
                bearing: 45, // Rotation in degrees from the URL
                pitch: 30, // Tilt in degrees for 3D effect from the URL
                navigationControl: false,
                // scrollZoom: true,
            });

            // Log when the map is loaded
            map.current.on("load", () => {
                console.log("Map loaded successfully");
                console.log("Map center:", map.current?.getCenter());
                console.log("Map zoom:", map.current?.getZoom());
                console.log("Map bearing:", map.current?.getBearing());
                console.log("Map pitch:", map.current?.getPitch());
            });

            // Log any errors
            map.current.on("error", (e: any) => {
                console.error("Map error:", e);
            });
        } catch (error) {
            console.error("Failed to initialize MapTiler map:", error);
        }

        // Cleanup the map instance when the component unmounts
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="w-screen h-screen z-90 block">
            <div
                ref={mapContainer}
                className="h-screen w-[100%] "
            />
        </div>
    );
};

export default MapComponent;