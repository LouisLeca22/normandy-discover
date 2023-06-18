
import Map from "../components/Map"
import Popup from "../components/Popup";
import SwitchLang from "../components/SwitchLang";
import { useAppSelector } from "../store";
import Markers from "../components/Markers";
import FilterCategory from "../components/FilterCategory";
import FilterCity from "../components/FilterCity";
import List from "../components/List";
import { useState } from "react";
import { Map as MapType} from "leaflet";
const Home = () => {
  const { region } = useAppSelector(state => state.activity)
  const {showList} = useAppSelector(state => state.ui)

  const [map, setMap] = useState<null | MapType >(null)

  return (
    <div className="home">
      <Map setMap={setMap} center={region.center} scrollWheelZoom={true} zoom={7} minZoom={7} doubleClickZoom={true} zoomControl={true} maxBoundsViscosity={1.0} maxBounds={region.maxBounds} >
        <Markers />
        {!showList && (
          <>
            <FilterCity />
            <FilterCategory />
            <SwitchLang />
          </>
        )}

      </Map>
      <List map={map} />
      <Popup />
    </div>
  )
}
export default Home