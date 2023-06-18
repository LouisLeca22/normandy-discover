
export type Coordinates = [number, number];

export  enum Lang {
    EN = 'EN',
    FR = 'FR',
    DE = "DE"
}

export type Info = {
    moreEN: string
    moreFR: string
    moreDE: string
    priceEN: string
    priceFR: string
    priceDE: string
    openEN: string
    openDE: string
    openFR: string
    funEN: string
    funFR: string
    funDE: string
    backEN: string
    backFR: string
    backDE: string
    weekEN: [string, string, string, string, string, string, string]
    weekFR: [string, string, string, string, string, string, string]
    weekDE: [string, string, string, string, string, string, string]
    morningEN: string
    morningFR: string
    morningDE: string
    afternoonEN: string
    afternoonFR: string
    afternoonDE: string
    alwaysEN: string
    alwaysFR: string
    alwaysDE: string
    adultsEN: string
    adultsFR: string
    adultsDE: string
    childrenEN: string
    childrenFR: string
    childrenDE: string
    freeEN: string 
    freeDE: string 
    freeFR: string
    closedEN: string
    closedFR: string 
    closedDE: string
    dayEN: string 
    dayFR: string 
    dayDE: string,
    descriptionEN: string,
    descriptionFR: string,
    descriptionDE: string,
    websiteEN: string,
    websiteFR: string,
    websiteDE: string,
    unspecifiedEN: string, 
    unspecifiedFR: string, 
    unspecifiedDE: string,
    allEN: string,
    allFR: string,
    allDE: string,
    distanceEN: string,
    distanceFR: string,
    distanceDE: string
}

export type Region = {
    nameEN: string 
    nameFR: string 
    nameDE: string
    center: Coordinates
    countryCode: string
    state: string
    maxBounds: [Coordinates, Coordinates]
}

export type Activity = {
    id: number
    titleEN: string
    titleFR: string 
    titleDE: string
    descEN: string
    descFR: string
    descDE: string
    imgURL: string
    category: Category 
    city: City
    coordinates: Coordinates
    schedule: Schedule
    price: [number, number]
    funEN: string
    funFR: string
    funDE: string,
    website: string | null
}

export  enum Category {
    all = "all",
    garden = "garden",
    museum = "museum",
    monument = "monument",
    location = "location",
    beach = "beach",
}


export type Cities = Record<keyof typeof City, Coordinates>

export enum City {
    all= "All",
    stMichel= "Mont Saint-Michel",
    cherbourg= "Cherbourg",
    landingBeaches= "D-Day beaches",
    bayeux= "Bayeux",
    caen= "Caen",
    deauville= "Deauville",
    honfleur= "Honfleur",
    havre= "Le Havre",
    etretat= "Étretat",
    fecamp= "Fécamp",
    rouen= "Rouen",
    giverny= "Giverny",
    // paris= "Paris",
}

export enum Tab  {
    tab1 = 1,
    tab2 = 2,
}

export type Point = {
    type: 'Feature' 
    properties: {
        cluster : boolean
        activityId: number
        category: string
    }
    geometry: {
        type: 'Point'
        coordinates: Coordinates
    }
}

export type Schedule = {
    standard?: {
        "0": {start: string, end: string}| null
        "1": {start: string, end: string} | null
        "2": {start: string, end: string} | null
        "3": {start: string, end: string} | null
        "4": {start: string, end: string} | null
        "5": {start: string, end: string} | null
        "6": {start: string, end: string} | null
    }
    complex?: {
        "0": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "1": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "2": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "3": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "4": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "5": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
        "6": {morning: {start: string, end: string } | null, afternoon : {start: string, end: string} | null } | null
    }
    always: boolean
}





