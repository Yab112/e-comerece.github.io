import appStore from "../../assets/apple.svg";
import playstore from "../../assets/android.svg";
import phone from "../../assets/phones.png";

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col mb-4" id="app">
      <div className="mx-auto max-w-[1440px] relative flex w-full justify-between overflow-hidden px-6 py-12 sm:flex-row sm:gap-12 lg:gap-20 xl:max-h-[500px] 2xl:rounded-5xl bg-primary">
        <div className="flex flex-col justify-center sm:w-1/2 lg:w-1/3">
          <h2 className="text-5xl font-bold text-black font-sans">Get Our App Now!</h2>
          <h4 className="text-lg text-black mt-2">Available for iOS and Android</h4>
          <p className="text-black mt-4 font-mono pl-4">
            Download our app to enjoy exclusive deals, seamless shopping
            experience, and instant access to your favorite products. Stay
            connected and get the best out of our services right at your
            fingertips.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-white text-black py-2 px-4 rounded-2xl flex items-center gap-2">
              <img src={appStore} alt="appstore" className="h-8 bg-black bottom-2 rounded-full " />
              App Store
            </button>
            <button className="bg-orange-300 rounded-2xl text-black py-2 px-4  flex items-center gap-2">
              <img src={playstore} alt="playstore" className="h-8 bg-black bottom-2 rounded-full "/>
              Play Store
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center sm:w-1/2 lg:w-2/3 mt-8 sm:mt-0">
          <img src={phone} alt="phone" className="object-contain w-full h-auto max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default GetApp;
