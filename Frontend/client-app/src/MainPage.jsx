import React from "react";
// import {Link,Route,Routes} from "react-router-dom"
import CustomerMain from "./customerviews/CustomerMain"
import VendorMain from "./vendorviews/VendorMain"
import HomePagePic from "./images/HomePagePic.avif"
import ReactDOM from "react-dom/client"

function MainPage()
{
    const handleVendor=()=>{
        const root = ReactDOM.createRoot(document.getElementById("root"))
        root.render(<VendorMain></VendorMain>)
    }

    const handleCustomer=()=>{
        const root = ReactDOM.createRoot(document.getElementById("root"))
        root.render(<CustomerMain></CustomerMain>)
    }

    return(
        <div>
            {/* <img src={HomePagePic} height="400px" width="900px" style={{borderRadius:"20px"}} />
            <nav>
            <Link to="/CustomerMain">🔯 Customer</Link>
            <br/> <span>     </span>
            <Link to ="/VendorMain">🔯 Vendor</Link>
            </nav>

            <Routes>
                <Route path="/CustomerMain" element={<CustomerMain></CustomerMain>}></Route>
                <Route path="/VendorMain" element={<VendorMain></VendorMain>}></Route>
            </Routes> */}

            <button onClick={handleCustomer}>Customer</button>
            <span>      </span>
            <button onClick={handleVendor}>Vendor</button>
        </div>
    )
} export default MainPage