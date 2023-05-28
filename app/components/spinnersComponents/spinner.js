
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Spinner = () => {
    return (
        <div className="text-white w-full flex justify-center items-center h-24 text-5xl">
            <FontAwesomeIcon icon={faSpinner} className="animationSpinner" />
        </div>
    )
}


export default Spinner