import { FaPhone } from "react-icons/fa";
import { categories } from "../../assets/data";

const Categories = ({ category, setCategory }) => {
  return (
    <section className="max-padd-container py-16 xl:py-20" id="shop">
      <div className="flex items-center gap-6 flex-wrap ">
        {categories.map((item, index) => (
          <div
            key={index}
            id={item.name}
            onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
            className={`py-4 px-20 rounded-3xl text-center cursor-pointer ${
              category === item.name ? "bg-[#ffd873]" : "bg-primary"
            }`}
          >
            <img
              src={item.image}
              alt={`category ${item.name}`}
              height={30}
              width={30}
            />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
