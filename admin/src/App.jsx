import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar, Sidebar } from "./components/compon";
import { Add, List, Orders } from "./pages";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = "your-api-url-here";

function App() {
  return (
    <Router>
      <NavBar className="fixed top-0 left-0 w-full z-50" />
      <div className="flex pt-[var(--navbar-height)] h-screen overflow-x-hidden">
        {/* Sidebar */}
        <div className="h-full w-[150px] overflow-y-auto">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 max-padd-container">
          <Routes>
            <Route path="/add" element={<Add />}/>
            <Route path="/list" element={<List />}/>
            <Route path="/orders" element={<Orders/> }/>
          </Routes>
        </div>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
