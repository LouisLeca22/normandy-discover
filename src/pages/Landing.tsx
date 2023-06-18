import Map from "../components/Map"
import Banner from "../components/Banner"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store"
import { Map as MapType} from "leaflet"


const Landing = () => {
  const {region} = useAppSelector(state => state.activity)
  const navigate = useNavigate()
  const [map, setMap] = useState<null | MapType>(null)
  
  useEffect(() => {
    let timer = setTimeout(() => navigate("/home", {replace: true}) ,4000)
    return () => {
      clearTimeout(timer);
    }
  }, [])
  
  return (
    <div className='landing'>
      <Map setMap={setMap} zoom={13} center={region.center} blur={true} doubleClickZoom={false} scrollWheelZoom={false} dragging={true} />
      <Banner />
    </div>
  )
}
export default Landing