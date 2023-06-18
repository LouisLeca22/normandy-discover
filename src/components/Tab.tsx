
import { useAppSelector } from "../store"
import { Tab as TabType } from "../types"

const Tab = () => {
    function getImageUrl(name: string) {
        return new URL(`../assets/images/${name}`, import.meta.url).href
      }
    const { activity, tab, distance } = useAppSelector(state => state.activity)
    const { lang, info } = useAppSelector(state => state.ui)
    return (
        <>
            {activity && tab == TabType.tab1 &&
                <div className="popup__middle--tab1">
                    <img src={getImageUrl(activity.imgURL)} alt="activity image" />
                    <h3>{info[`description${lang}`]} :</h3>
                    <p>{activity[`desc${lang}`]}</p>
                    <h3>{info[`fun${lang}`]} :</h3>
                    <p>{activity[`fun${lang}`]}</p>
                </div>
            }
            {activity && tab == TabType.tab2 &&
                <div className="popup__middle--tab2">
                    <div className="schedule">
                        <h3>{info[`open${lang}`]} {lang == "FR" ? " :" : ":"}</h3>
                        {activity.schedule.always && <h2>{info[`always${lang}`]}</h2>}
                        {activity.schedule.standard && <div className="standard">
                            {Object.keys(activity.schedule.standard).map((key) => (
                                <div key={key}>
                                    <span>{info[`week${lang}`][Number(key)]}:</span>
                                    {(activity.schedule.standard?.[key as keyof typeof activity.schedule.standard] === null) ?
                                        info[`closed${lang}`]
                                        : `${activity.schedule.standard?.[key as keyof typeof activity.schedule.standard]?.start} - ${activity.schedule.standard?.[key as keyof typeof activity.schedule.standard]?.end}`
                                    }
                                </div>
                            ))}
                        </div>}
                        {activity.schedule.complex && <div className="complex">
                            <div className="days">
                                <div>{info[`day${lang}`]}</div>
                                {info[`week${lang}`].map(v => (
                                    <div>{v}</div>
                                ))}
                            </div>
                            <div className="morning">
                                <div>{info[`morning${lang}`]}</div>
                                {Object.keys(activity.schedule.complex).map((key) => (
                                    <div>
                                        {(activity.schedule.complex?.[key as keyof typeof activity.schedule.complex] === null
                                            || activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.morning === null
                                        )
                                            ?
                                            info[`closed${lang}`]
                                            : `${activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.morning?.start} - ${activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.morning?.end}`
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="afternoon">
                                <div>{info[`afternoon${lang}`]}</div>
                                {Object.keys(activity.schedule.complex).map((key) => (
                                    <div>
                                        {(activity.schedule.complex?.[key as keyof typeof activity.schedule.complex] === null
                                            || activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.afternoon === null
                                        )
                                            ?
                                            info[`closed${lang}`]
                                            : `${activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.afternoon?.start} - ${activity.schedule.complex?.[key as keyof typeof activity.schedule.complex]?.afternoon?.end}`
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                    <div className="price">
                        <h3>{info[`price${lang}`]} :</h3>
                        {(activity.price[0] === Number(0)) ? <h2>{info[`free${lang}`]}</h2>
                            : activity.price[0] === activity.price[1] ? <h2>{activity.price[0].toFixed(2)} €</h2>
                                : <div>
                                    <div>
                                        <span>{info[`adults${lang}`]}:</span> {activity.price[0].toFixed(2)} €
                                    </div>
                                    <div>
                                        <span>{info[`children${lang}`]}:</span> {activity.price[1].toFixed(2)} €
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="website">
                        <h3>{info[`website${lang}`]} :</h3>
                        {activity.website ?
                            <a href={`${activity.website}`} target="_blank"><h2>{activity.website}</h2></a>
                            :
                            <h2>{info[`unspecified${lang}`]}</h2>
                        }
                    </div>
                    <div className="distance">
                        <h3>{info[`distance${lang}`]} :</h3>
                        <h2>{distance ? `≈ ${distance} km` : info[`unspecified${lang}`]} </h2>
                    </div>
                </div>
            }
        </>
    )

}
export default Tab