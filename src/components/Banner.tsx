import Typewriter from "typewriter-effect"
import Cover1 from "../assets/images/cover1.webp"
import Cover2 from "../assets/images/cover2.webp"
import Cover3 from "../assets/images/cover3.webp"
import Cover4 from "../assets/images/cover4.webp"
import Cover5 from "../assets/images/cover5.webp"
import Cover6 from "../assets/images/cover6.webp"

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner__box">
                <img src={Cover1} alt="image cover one" />
            </div>
            <div className="banner__box">
                <img src={Cover2} alt="image cover two" />
            </div>
            <div className="banner__box">
                <img src={Cover3} alt="image cover three" />
            </div>
            <div className="banner__box">
                <img src={Cover4} alt="image cover four" />

            </div>
            <div className="banner__box">
                <h1>Discover</h1>
                <Typewriter 
                    
                    options={{
                        strings: "Normandy",
                        autoStart: true,
                        delay: 'natural',
                        cursor: ''
                    }}
                />
                <h3>© Louis Leca - 2022</h3>
            </div>
            <div className="banner__box">
                <img src={Cover5} alt="image cover fix" />
            </div>
            <div className="banner__box">
                <img src={Cover6} alt="image cover six" />
            </div>
        </div>
    )
}
export default Banner