'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Coordenadas: Rua Cantidiano de Andrade, 790, Católé do Rocha – PB
const LAT  = -6.3445
const LNG  = -37.7385
const ZOOM = 16

// Marcador customizado com a cor dourada da marca
const GOLD_ICON = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 36px; height: 36px;
      background: linear-gradient(135deg, #C9A96E 0%, #E8C99A 50%, #C9A96E 100%);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid rgba(201,169,110,0.5);
      box-shadow: 0 4px 20px rgba(201,169,110,0.45), 0 0 0 4px rgba(201,169,110,0.12);
    ">
      <div style="
        width: 10px; height: 10px;
        background: #1A1410;
        border-radius: 50%;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
})

// Ajusta o tile layer após montagem para escurecer o mapa
function DarkMapTiles() {
  const map = useMap()
  useEffect(() => {
    // Adiciona filtro CSS ao container do mapa para reforçar o tema dark
    const container = map.getContainer()
    container.style.filter = 'brightness(0.85) saturate(0.7) sepia(0.1)'
  }, [map])
  return null
}

export default function ZavinaMap() {
  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={ZOOM}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      zoomControl={false}
    >
      {/* CartoDB Dark Matter – tema escuro sem API key */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/" target="_blank">CARTO</a>'
        maxZoom={19}
      />

      <DarkMapTiles />

      <Marker position={[LAT, LNG]} icon={GOLD_ICON}>
        <Popup
          closeButton={false}
          className="zavina-popup"
        >
          <div style={{
            background: '#1A1410',
            border: '1px solid rgba(201,169,110,0.25)',
            borderRadius: '8px',
            padding: '12px 16px',
            minWidth: '200px',
            fontFamily: 'var(--font-body), sans-serif',
          }}>
            <p style={{ color: '#C9A96E', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Zavina Brand
            </p>
            <p style={{ color: '#F0E6D3', fontSize: '13px', fontWeight: 500, marginBottom: '4px', lineHeight: 1.4 }}>
              Rua Cantidiano de Andrade, 790
            </p>
            <p style={{ color: 'rgba(240,230,211,0.55)', fontSize: '11px', lineHeight: 1.5 }}>
              Catolé do Rocha – PB<br />
              CEP 58884-000
            </p>
            <a
              href="https://www.google.com/maps/search/Rua+Cantidiano+de+Andrade+790+Catol%C3%A9+do+Rocha+PB"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                color: '#C9A96E',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Abrir no Maps ↗
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
