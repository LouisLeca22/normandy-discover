import {IoLanguage} from "react-icons/io5";
import { Lang } from "../types";
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from "../store";
import { switchLang, toggleShowLang } from "../features/uiSlice";


const SwitchLang = () => {
  const ref = useRef(null)
    const {showLang, lang} = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    useOnClickOutside(ref, () => dispatch(toggleShowLang(false)))
  return (
    <div ref={ref} className={showLang ? "switchLang active": "switchLang"} >
        <div onClick={() => dispatch(toggleShowLang(showLang ? false : true))}>
            <IoLanguage className="lang-btn" />
        </div>
        <ul>
          {Object.values(Lang).map(flag => (
                <li title={flag} key={flag} className={flag === lang ? "active" : ""} onClick={() => {
                  dispatch(switchLang(flag))
                  dispatch(toggleShowLang(false))
                }}>
                  <img src={new URL(`../assets/images/${flag}.svg`, import.meta.url).href} className="flag"  alt={`flag-${lang}`}/>
                </li>
          ))}
        </ul>
    </div>
  )
}
export default SwitchLang