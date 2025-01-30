import React from "react";
import CustomerLogin from "./CustomerLogin"
import CustomerReg from "./CustomerReg"
import { Link,Routes,Route } from "react-router-dom";
import customermainpic from "../images/customermainpic.jpeg"

function CustomerMain()
{
    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white', borderRadius:"20px"}}>Customer Main Page</h4>
                <img src={customermainpic} height={300} width={850}/>
                <nav>
                    <Link to="/CustomerLogin">🔯 Login</Link>
                    <span>   </span>
                    <Link to="/CustomerReg"> 🔯 Register</Link>
                </nav>
                <Routes>
                    <Route path="/CustomerLogin" element={<CustomerLogin></CustomerLogin>}></Route>
                    <Route path="/CustomerReg" element={<CustomerReg></CustomerReg>}></Route>
                </Routes>
            </center>
        </div>
    )
} export default CustomerMain