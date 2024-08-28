import SocialIcon from "./socialIcons";
const Footer = () => {
  return (
    <footer className="msx-padd-container bg-tertiary py-8">
      <div className="flexCenter flex-col gap-y-4">
        <h4 className="text-white text-xl font-bold">
          follow us on social media
        </h4>
        <SocialIcon />
        <hr className="h-[1px] w-2/3 my-3"/>
        <div className="text-gray-400">copyright &copy;yabushop | All right reserved.</div>
      </div>
    </footer>
)}

export default Footer
