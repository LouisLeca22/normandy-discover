import { useOnClickOutside } from 'usehooks-ts'
import { toggleShowFilterActivity, toggleShowFilterCity } from '../features/uiSlice';
import { useAppDispatch, useAppSelector } from "../store";
import { ReactNode, useRef } from "react"
import { IoFilter } from "react-icons/io5"
import { Category } from '../types';
import {fetchCategoryIcon, CategoryIconType} from "../helpers/fetchIcons"
import { filterActivities } from '../features/activitySlice';

const FilterCategory= () => {
  const ref = useRef(null)
  const { category } = useAppSelector(state => state.activity)
  const { showFilterActvity, info, lang} = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  useOnClickOutside(ref, () => dispatch(toggleShowFilterActivity(false)))

  return (
    <div ref={ref} className={showFilterActvity? "filterCategory active" : "filterCategory"}>
      <div onClick={() => dispatch(toggleShowFilterActivity(showFilterActvity ? false : true))}>
        <IoFilter className="category-btn" />
      </div>
      <ul>
          {Object.values(Category).map(filter => (
                <li title={filter.toUpperCase()} key={filter} className={filter === category ? "active" : ""} onClick={() => {
                  dispatch(filterActivities(filter))
                  dispatch(toggleShowFilterActivity(false))
                }}>
                  {filter === "all" ? <span>{info[`all${lang}`]}</span>: fetchCategoryIcon(filter, CategoryIconType.filter) as ReactNode}
                </li>
          ))}
        </ul>
    </div>
  )
}
export default FilterCategory