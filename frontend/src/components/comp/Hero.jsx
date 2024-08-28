import { ShopContext } from "@/Pages/Context/shopContext";
import { useContext, useState } from "react";
import hero from "../../assets/bg.png";
import heroimage from "../../assets/hero.png";
import {} from "react-icons/fa"

const Hero = () => {
  const images = [hero, heroimage];
  const { bgImage, setbgImage } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBgChange = (newImage) => {
    setbgImage(newImage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
    <section
      className={`relative bg-cover bg-center bg-no-repeat h-[744px] w-full flex flex-col justify-center items-start text-left text-white px-6 md:px-12`}
      id="home"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      <i class="fa fa-play" aria-hidden="true"></i>
      {/* Content that needs to be above the overlay */}
      <div className="relative z-10 mb-12 max-w-screen-lg -mx-2 my-28">
         
        <h4 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider mb-4">
          Your Trusted Partner in B2B Commerce
        </h4>
        <h2 className="text-[20px] md:text-xl font-bold mb-6 max-w-[40rem] text-black">
          Connecting Businesses with Seamless Trade Solutions.
        </h2>
      </div>

      {/* Search form */}
      <div className="relative z-10 w-[800px] p-4 rounded-full bg-white hidden lg:block">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="bg-gray-100 w-full h-10 px-2 border-none rounded-lg focus:outline-none text-black"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className=" w-40 bg-amber-500 text-white h-10 rounded-2xl -ml-40 absolute "
          >
            Search
          </button>
        </form>
        <div></div>
      </div>
      <div className="flex flex-col  w-full mt-4 z-10">
        <h2 className="text-2xl text-slate-900 ml-4 ">
          Frequently searched items
        </h2>
        <div className="flex items-center gap-2 w-full mt-4 ml-8">
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
          <button className="border-amber-300 border rounded-3xl px-2">
            Iphone
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-10 h-[100px] z-10 bg-black opacity-30"></div>
    </section>
  );
};

export default Hero;