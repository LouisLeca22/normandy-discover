import { useState, useCallback, useEffect} from "react"
import {useMap, Marker, Popup} from "react-leaflet"
import useSupercluster from "use-supercluster"
import {  Point } from "../types"
import {BBox} from "geojson";
import { CategoryIconType, fetchMyPositionIcon } from "../helpers/fetchIcons"
import { fetchCategoryIcon, fetchClusterIcon } from "../helpers/fetchIcons"
import { DivIcon, LatLng } from "leaflet"
import { useAppDispatch, useAppSelector } from "../store";
import {  addDistanceFromLocation, selectActivity } from "../features/activitySlice";
import L from "leaflet"
const Markers = () => {
  const {activities} = useAppSelector(state => state.activity)
  const dispatch = useAppDispatch()
  const maxZoom = 22;
  const [bounds, setBounds] = useState<BBox | undefined>(undefined);
  const [zoom, setZoom] = useState(12);
  const [myposition, setMyPosition] = useState<LatLng | null>(null)
  const map = useMap();

  function updateMap(): void {
   
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map, dispatch]);

  useEffect(() => {
    updateMap();
    map.locate().on("locationfound", (e) => {
     if( map.getBounds().contains(e.latlng)){
       setMyPosition(e.latlng)
     }
    })
  }, [map]);



  useEffect(() => {
    map.on("move", onMove);

    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  

  const points: Point[] = activities.map((activity) => ({
    type: "Feature",
    properties: { cluster: false, activityId: activity.id, category: activity.category },
    geometry: {
      type: "Point",
      coordinates: [
        activity.coordinates[1],
        activity.coordinates[0]
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {myposition && <Marker  position={myposition} icon={fetchMyPositionIcon()}>
        </Marker>}
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties as supercluster.ClusterProperties

        // cluster
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={ fetchClusterIcon(
                pointCount,
                50
              ) }
              eventHandlers={{
                click: () => {
                  if(typeof supercluster !== "undefined" && typeof cluster.id === "number"){
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      maxZoom
                      );
                      map.setView([latitude, longitude], expansionZoom, {
                        animate: true,
                      });
                    }
                },
              }}
            />
          );
        }

        // single acitivity 
        return (
          <Marker
            key={`activity-${cluster.properties.activityId}`}
            position={[latitude, longitude]}
            icon={fetchCategoryIcon(cluster.properties.category, CategoryIconType.marker) as DivIcon}
            eventHandlers={{
              click: () => {
                map.flyTo([latitude, longitude], 17)
                dispatch(selectActivity(cluster.properties.activityId))
                if(myposition){
                  let distance = map.distance(myposition, [latitude,longitude])
                  distance = Number((distance / 1000).toFixed(2))
                  dispatch(addDistanceFromLocation(distance))
                }
              } 
            }}
          />
        );
      })}
    </>
  )
}
export default Markers