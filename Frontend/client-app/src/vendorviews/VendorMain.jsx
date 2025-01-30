import React from "react";
import VendorLogin from "./VendorLogin"
import VendorReg from "./VendorReg"
import { Link,Routes,Route } from "react-router-dom";
import vendormainpic from "../images/vendormainpic.webp"

function VendorMain()
{
    return(
        <div>
            <center>
                <img src={vendormainpic} height={300} width={850}/>
                <nav>
                    <Link to="/VendorLogin">Login</Link> 
                    <span>   </span>
                    <Link to="/VendorReg"> Register</Link>
                </nav>
                <Routes>
                    <Route path="/VendorLogin" element={<VendorLogin></VendorLogin>}></Route>
                    <Route path="/VendorReg" element={<VendorReg></VendorReg>}></Route>
                </Routes>
            </center>
        </div>
    )
} export default VendorMain