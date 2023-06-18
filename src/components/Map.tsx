import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'
import { ReactNode } from 'react';
import {Coordinates} from "../types"
import { Map as MapType} from 'leaflet';

export type MapProps = {
  center: [number, number]
  zoom: number 
  scrollWheelZoom: boolean 
  doubleClickZoom: boolean
  zoomControl?: boolean
  children?: ReactNode
  blur?: boolean
  dragging?: boolean
  maxBoundsViscosity?: number
  maxBounds?: [Coordinates, Coordinates]
  minZoom?: number
  setMap: React.Dispatch<React.SetStateAction<MapType | null>>
}

const Map = ({
  setMap,
  center,
  children,
  zoom,
  zoomControl,
  blur,
  dragging,
  scrollWheelZoom,
  doubleClickZoom,
  minZoom,
  maxBounds,
  maxBoundsViscosity }: MapProps) => {
  

  return (
    <MapContainer
      ref={setMap}
      center={center}
      zoomControl={false}
      zoom={zoom}
      doubleClickZoom={doubleClickZoom}
      scrollWheelZoom={scrollWheelZoom}
      attributionControl={false}
      dragging={!dragging}
      className={blur ? "map-blur" : ""}
      minZoom={minZoom}
      maxBounds={maxBounds}
      maxBoundsViscosity={maxBoundsViscosity} 
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zoomControl && <ZoomControl position='bottomright' />}
      {children && children}
      
    </MapContainer>
  )
}

export default Map