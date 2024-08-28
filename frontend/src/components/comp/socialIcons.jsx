import { RiYoutubeFill ,RiInstagramFill,RiTwitterFill,RiDribbbleFill} from "react-icons/ri"
import {Link} from "react-router-dom"
const SocialIcon = () => {
  return (
    <div className="flex gap-x-4">
       <Link to={''} className="text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-500"><RiYoutubeFill/></Link>
       <Link to={''} className="text-[#eeee17] text-2xl hover:-translate-y-1 transition-all duration-500"><RiInstagramFill/></Link>
       <Link to={''} className="text-[#f65f23] text-2xl hover:-translate-y-1 transition-all duration-500"><RiTwitterFill/></Link>
       <Link to={''} className="text-[#e32c54] text-2xl hover:-translate-y-1 transition-all duration-500"><RiDribbbleFill/></Link>
    </div>
  )
}

export default SocialIcon
