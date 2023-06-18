import { Link } from "react-router-dom"
import notFound from "../assets/images/not_found.svg"
const NotFound = () => {
  return (
    <div className="notFound">
      <img src={notFound} alt="404 not found" />
      <h3>Sorry we weren't able to find the page you are looking for</h3>
      <Link to="/" >Back to Homepage</Link>
    </div>
  )
}
export default NotFound