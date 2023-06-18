import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useOnClickOutside } from "usehooks-ts";
import { toggleShowList } from "../features/uiSlice";
import { useAppDispatch, useAppSelector } from "../store";
import {useRef, useEffect} from "react"
import Card from "./Card";
import { Activity } from "../types";
import { Map } from "leaflet";


const List = ({map}: {map: Map | null}) => {
    const dispatch = useAppDispatch()
    const ref = useRef(null)
    const { showList } = useAppSelector(state => state.ui)
    const {activities} = useAppSelector(state => state.activity)
    useOnClickOutside(ref, () => dispatch(toggleShowList(false)))

    useEffect(() => {
        if (showList) {
          document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === "Escape") {
             dispatch(toggleShowList(false))
            }
          })
        }
      }, [showList])
    return (
        <div ref={ref} className={showList ? "list  active" : "list"}>
    
            <div className="list__wrapper">
              {activities.map((activity: Activity) => (
                <Card map={map} key={activity.id} activity={activity} />
              ))}
            </div>
            {
                showList ? (
                    <FaChevronUp className="chevron-btn" onClick={() => dispatch(toggleShowList(false))}/>
                ) : (
                    <FaChevronDown className="chevron-btn" onClick={() => dispatch(toggleShowList(true))} />
                )
            }
        </div>
    )
}
export default List