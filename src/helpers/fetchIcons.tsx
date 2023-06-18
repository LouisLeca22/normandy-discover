import { MdMuseum} from "react-icons/md";
import { IoMdLeaf } from "react-icons/io";
import {IoLocationSharp} from "react-icons/io5"
import {FaLocationArrow, FaMonument, FaUmbrellaBeach, } from "react-icons/fa";
import L from "leaflet";
import { Category } from "../types";
import { renderToStaticMarkup } from 'react-dom/server';

type ClusterIcons = {
  [key: number]: L.DivIcon
}

const clusterIcons = {} as ClusterIcons;

export const fetchClusterIcon = (count: number, size: number): L.DivIcon => {
  if (!clusterIcons[count]) {
    clusterIcons[count] = L.divIcon({
      html: `<div class="cluster-marker-icon" style="width: ${size}px; height: ${size}px;">
          ${count}
        </div>`,
    });
  }
  return clusterIcons[count];
};

export const fetchMyPositionIcon = ():L.DivIcon => {
  return  L.divIcon({
    html: renderToStaticMarkup(<FaLocationArrow className="myposition-marker-icon" />)
  });
}


export const enum CategoryIconType {
  marker = "marker",
  popup = "popup",
  filter = "filter",
  card = "card"
}

export const fetchCategoryIcon = (category: Category, type: CategoryIconType) => {
  const gardenIcon = <IoMdLeaf className={`category-${type}-icon`} />
  const museumIcon = <MdMuseum className={`category-${type}-icon`} />
  const monumentIcon = <FaMonument className={`category-${type}-icon`} />
  const locationIcon = <IoLocationSharp className={`category-${type}-icon`} />
  const beachIcon = <FaUmbrellaBeach className={`category-${type}-icon`} />

  const categoryIcons = {
    gardenIcon,
    museumIcon,
    monumentIcon,
    locationIcon,
    beachIcon
  }

  if(category !== "all"){
    if (type === "marker") {
      return L.divIcon({
        html: renderToStaticMarkup(categoryIcons[`${category}Icon`]),
      })
    } 
    return categoryIcons[`${category}Icon`]
  }
}



