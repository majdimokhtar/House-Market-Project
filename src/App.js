import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from  "./pages/Explore"
import SignIn from  "./pages/SignIn"
import SignUp from  "./pages/SignUp"
import Offers from  "./pages/Offers"
import Category from "./pages/Category"
import CreateListing from "./pages/CreateListing";
import ForgotPassword from  "./pages/ForgotPassword"
import Profile from  "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Explore/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/create-listing" element={<CreateListing/>} />
      <Route path="/offers" element={<Offers/>} />
      <Route path="/category/:categoryName" element={<Category/>} />
      
      <Route path="/profile" element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>} />
      </Route>
 
      </Routes>
      <Navbar/>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
