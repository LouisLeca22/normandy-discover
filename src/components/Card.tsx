import { useAppDispatch, useAppSelector } from "../store"
import { Activity } from "../types"
import {CategoryIconType, fetchCategoryIcon} from "../helpers/fetchIcons"
import { ReactNode } from "react"
import {HiSearch, HiLocationMarker} from "react-icons/hi"
import { Map } from "leaflet"
import { selectActivity } from "../features/activitySlice"
import { toggleShowList } from "../features/uiSlice"

const Card = ({activity, map}: {activity: Activity, map: Map | null}) => {
    
  const {lang} = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()


  return (
    <div className="card">
        <div className="card__top">
            <span>{activity[`title${lang}`].length > 40 ? activity[`title${lang}`].substring(0,40).concat("...")  : activity[`title${lang}`] } </span>
            {fetchCategoryIcon(activity.category, CategoryIconType.card) as ReactNode}
        </div>
        <div className="card__middle">
            {activity[`desc${lang}`].substring(0,200).concat("...")}
        </div>
        <div className="card__bottom">
                <span>
                <HiLocationMarker className="location-icon" />
                <h3>{activity.city}</h3>
                </span>
                <HiSearch onClick={() => {
                                  dispatch(toggleShowList(false))
                                  map?.flyTo(activity.coordinates, 17)
                                  dispatch(selectActivity(activity.id))
                }} className="search-btn" />
        </div>
    </div>
  )
}
export default Card