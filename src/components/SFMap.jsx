'use client';
import React, { useRef } from 'react';
import Script from 'next/script';

export default function SFMap() {
    const mapRef = useRef(null);

    return (
      <>
        <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&v=weekly`} strategy='afterInteractive'
        onLoad={() => {
          if (!window.google || !mapRef.current) return; // Ensures the website has loaded along with the Google script

          // Creates the map
          new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.7649, lng: -122.4494 }, // Coords for SF
            zoom: 12.2,
          });
        }}
      />
      {/* Container for the map */}
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100vh' }}
      />
    </>
  );
}