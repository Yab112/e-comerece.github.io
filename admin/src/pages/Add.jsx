import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { AdminContext } from './Context/AdminContext';
import RemoveImageDialog from '../components/ui/UiComp/alert'; // Check path correctness
import { upload_area } from '@/assets'; // Check path correctness
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const { handleImageChange, image, data, setData, onChangeHandler, setImage } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Ensure image, data.name, data.price, data.description, data.category exist before submitting
    if (!image || !data.name || !data.price || !data.description || !data.category) {
      toast.error('Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); 
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('category', data.category);

    try {
      const response = await axios.post('http://localhost:3000/api/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData({
          name: '',
          price: '',
          description: '',
          category: 'Men',
        });
        setImage(null); // Reset image
        toast.success(response.data.message); 
      } else {
        toast.error('Failed to add product'); // Handle unexpected failure response
      }
    } catch (error) {
      console.error('Error uploading the product:', error); // Log error
      toast.error('Error uploading the product'); // Show error toast
    }
  };

  return (
    <section className="p-4 sm:p-10 w-full bg-primary/20">
      <form
        action=""
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-5 max-w-[1000px] mx-auto bg-white p-6 rounded shadow-md"
      >
        <h4 className="bold-22 pb-2 uppercase text-center">Product Upload</h4>

        <div className="flex flex-col gap-y-2">
          <p>Upload Image</p>
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center justify-center w-24 h-24 border border-dashed border-gray-400 rounded"
          >
            <img
              src={image ? URL.createObjectURL(image) : upload_area} // Make sure `upload_area` is an actual image path or URL
              alt="Upload area"
              className="w-full h-full object-contain"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={handleImageChange} // Ensure this function properly sets the image state
          />

          {image && (
            <div className="mt-4 p-2 bg-gray-100 rounded flex justify-between items-center">
              <div>
                <h1 className="text-green-600">One image selected</h1>
                <p className="text-gray-800">Selected Image: {image.name}</p>
              </div>
              <div className="border border-red-500 rounded-full cursor-pointer">
                <RemoveImageDialog /> {/* Make sure this dialog handles image removal */}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-2 mt-3 w-[40%]">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler} // Ensure this updates the `data` state
            value={data.name}
            type="text"
            placeholder="Product name"
            required
            name="name"
            className="ring ring-slate-900/10 py-2 px-3 outline-none rounded"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler} // Ensure this updates the `data` state
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write your content here..."
            required
            className="ring-1 ring-slate-900/10 py-2 px-3 outline-none resize-none rounded"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-y-2 flex-1">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler} // Ensure this updates the `data` state
              value={data.category}
              name="category"
              required
              className="outline-none ring-1 ring-slate-900/10 py-2 px-3 rounded"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kid">Kid</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-2 flex-1">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler} // Ensure this updates the `data` state
              value={data.price}
              type="number"
              placeholder="Product price"
              required
              name="price"
              className="outline-none ring-1 ring-slate-900/10 py-2 px-3 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 text-white p-3 rounded w-full mt-4 bg-blue-600 hover:bg-blue-700 transition"
        >
          <FaPlus />
          Add Product
        </button>
      </form>
    </section>
  );
};

export default Add;
