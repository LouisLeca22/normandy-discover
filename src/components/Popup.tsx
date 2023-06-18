import { ReactNode, useEffect} from "react"
import { CategoryIconType, fetchCategoryIcon } from "../helpers/fetchIcons"
import Tab from "./Tab"
import { IoMdClose } from "react-icons/io"
import { IoIosArrowBack } from "react-icons/io"
import { Tab as TabType } from "../types"
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from "../store"
import { unselectActivity } from "../features/activitySlice"
import { switchTab } from "../features/activitySlice"

const Popup = () => {
    const {activity, tab} = useAppSelector(state => state.activity)
    const {lang, info} = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const ref = useRef(null)
    useOnClickOutside(ref, () => dispatch(unselectActivity()))

    useEffect(() => {
    if (typeof activity !== "undefined") {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === "Escape") {
         dispatch(unselectActivity())
        }
      })
    }
  }, [activity])
    return (
        <div ref={ref} className={typeof activity !== "undefined" ? "popup active" : "popup"}>
            <div className="popup__top">
                <div className="popup__top--left">
                    {activity && fetchCategoryIcon(activity.category, CategoryIconType.popup) as ReactNode}
                </div>
                <div className="popup__top--center">
                    {activity && activity[`title${lang}`]}
                </div>
                <div className="popup__top--right" >
                    <IoMdClose className="close-btn" onClick={() => {dispatch(unselectActivity())}} />
                </div>
            </div>
            <div className="popup__middle">
                {activity && <Tab />}
            </div>
            <div className="popup__bottom" >
                {tab === TabType.tab1 && <button className="more-btn" onClick={() => dispatch(switchTab(TabType.tab2))}>{info[`more${lang}`]}</button>}
                {tab === TabType.tab2 && <button className="back-btn" onClick={() => dispatch(switchTab(TabType.tab1))}><IoIosArrowBack className="arrow-popup"/> {info[`back${lang}`]}</button>}
            </div>
        </div>    
    )
}
export default Popup