import { Route, Routes } from "react-router-dom"

import Contact from "./pages/Contact"
// import { MessageCircle , Phone  } from "lucide-react";
import ProductsPage from "./pages/Products"
import About from "./pages/About"

import Home from "./pages/Home"
import ScrollToTop from "./components/scrollTop"

// import Login from "./auth/Login";
import ProductAdmin from "./components/ProductAdmin";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./pages/Profile"
import ProductDetails from "./components/ProductDetail"




function App() {
 

  return (
    <>
    <ScrollToTop/>
      
     
       <Routes>
          <Route path="/" element={<Home title="Home Page" />} />
          <Route path="/products" element={<ProductsPage title="Products Page" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About title="About Page" />} />
          <Route path="/contact" element={<Contact title="Contact Page" />} />
          {/* <Route path="/admin" element={<Admin title="Contact Page" />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/productAdmin" element={<ProtectedRoute><ProductAdmin /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>

       
      

        
    </>
  )
}

export default App
