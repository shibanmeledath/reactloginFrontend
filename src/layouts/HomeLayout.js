import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"
const HomeLayout = () => {
  return  <>
  <Header />
  <Navbar />
  <Outlet />
  <Footer/>
  
  </>
}

export default HomeLayout
