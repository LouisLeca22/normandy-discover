import { FaCity } from "react-icons/fa"
import { useOnClickOutside } from "usehooks-ts"
import { toggleShowFilterCity } from "../features/uiSlice"
import { useAppDispatch, useAppSelector } from "../store"
import { City } from "../types"
import { useRef } from "react"
import { filterCities } from "../features/activitySlice"
import { useMap } from "react-leaflet"
const FilterCity = () => {
  const map = useMap()
  const ref = useRef(null)
  const { showFilterCity, } = useAppSelector(state => state.ui)
  const { cities, city } = useAppSelector(state => state.activity)
  const dispatch = useAppDispatch()
  useOnClickOutside(ref, () => dispatch(toggleShowFilterCity(false)))

  return (
    <div ref={ref} className={showFilterCity ? "filterCity active" : "filterCity"}>
      <div onClick={() => dispatch(toggleShowFilterCity(showFilterCity ? false : true))}>
        <FaCity className="city-btn" />
      </div>
      <ul>
        {Object.keys(City).map((key) => (
          <li className={City[key as keyof typeof City] === city ? "active": "" } onClick={() => {
            dispatch(filterCities(key as keyof typeof City))
            dispatch(toggleShowFilterCity(false))
            let zoom;
            if (key == "all") {
              zoom = 8
            } else {
              zoom = 12
            }
            map.setView(cities[key as keyof typeof City], zoom, {
              animate: true,
            });
          }} key={key} value={key}>{City[key as keyof typeof City]}</li>
        ))}
      </ul>


      {/* <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterCities(e.target.value as keyof typeof City))
        dispatch(toggleShowFilterCity(false))
        let zoom;
        if (e.target.value == "all") {
          zoom = 8
        } else {
          zoom = 12
        }
        map.setView(cities[e.target.value as keyof typeof City], zoom, {
          animate: true,
        });
        
      }}>
        {Object.keys(City).map((key) => (
          <option  key={key} value={key}>{City[key as keyof typeof City]}</option>
        ))}
      </select> */}
    </div>

  )
}
export default FilterCity