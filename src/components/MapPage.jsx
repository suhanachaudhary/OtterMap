import { Map, View } from 'ol';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';
import { OSM, Vector as VectorSource } from 'ol/source';
import React, { useEffect, useState } from 'react';

function MapPage() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    const [draw, setDraw] = useState(null);
    const [modify, setModify] = useState(null);
    const [vectorSource, setVectorSource] = useState(null);

    useEffect(() => {
        if (document.getElementById('map-container').children.length > 0) {
            return;
        }

        const rasterLayer = new TileLayer({
            source: new OSM(),
        });

        const newVectorSource = new VectorSource({ wrapX: false });
        const vectorLayer = new VectorLayer({ source: newVectorSource });

        const map = new Map({
            target: 'map-container',
            layers: [rasterLayer, vectorLayer],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        const drawInteraction = new Draw({
            source: newVectorSource,
            type: 'Polygon',
        });

        const modifyInteraction = new Modify({ source: newVectorSource });
        const snap = new Snap({ source: newVectorSource });

        map.addInteraction(drawInteraction);
        map.addInteraction(modifyInteraction);
        map.addInteraction(snap);

        drawInteraction.setActive(false);  // Initially disable drawing
        modifyInteraction.setActive(true); // Enable editing by default

        setDraw(drawInteraction);
        setModify(modifyInteraction);
        setVectorSource(newVectorSource);

        return () => map.setTarget(undefined);  // Cleanup on unmount
    }, []);

    // Handle adding new polygons
    const handleAddPolygon = () => {
        console.log("Add Polygon Mode Activated");
        draw && draw.setActive(true);
        modify && modify.setActive(false);  // Disable editing while drawing
    };

    // Handle editing polygons
    const handleEditPolygon = () => {
        console.log("Edit Polygon Mode Activated");
        modify && modify.setActive(true);
        draw && draw.setActive(false);  // Disable drawing while editing
    };

    // Handle clearing all polygons
    const handleClearPolygons = () => {
        console.log("Clear All Polygons");
        vectorSource && vectorSource.clear();
    };

    return (
        <div className="min-h-screen bg-zinc-800 text-[#f23064] flex flex-col items-center justify-center p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center border-b-4 border-[#f23064] pb-2 w-[90%] sm:w-[60%]">
                {userData.firstName || "User"}'s Map
            </h1>

            {/* Control Buttons */}
            <div className="flex gap-4 mb-4">
                <button 
                    className="bg-[#f23064] text-white py-2 px-4 rounded-lg hover:bg-[#e21d58] transition"
                    onClick={handleAddPolygon}
                >
                    Add Polygon
                </button>

                <button 
                    className="bg-[#f23064] text-white py-2 px-4 rounded-lg hover:bg-[#e21d58] transition"
                    onClick={handleEditPolygon}
                >
                    Edit Polygon
                </button>

                <button 
                    className="bg-[#f23064] text-white py-2 px-4 rounded-lg hover:bg-[#e21d58] transition"
                    onClick={handleClearPolygons}
                >
                    Clear All
                </button>
            </div>

            {/* Map Container */}
            <div
                id="map-container"
                className="w-full sm:w-[800px] h-[400px] sm:h-[600px] border-4 border-[#f23064] rounded-lg shadow-xl"
            ></div>
        </div>
    );
}

export default MapPage;

