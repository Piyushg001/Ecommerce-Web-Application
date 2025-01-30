import React,{useState,useEffect} from "react"
import axios from "axios"
import VendorHome from "./VendorHome"
import ReactDOM from "react-dom/client"

function VendorLogin()
{
    const[uid,setUId]=useState()
    const[upass,setUPass]=useState()

    const handleUIdText=(evt)=>{
        setUId(evt.target.value)
    }
    const handleUPassText=(evt)=>{
        setUPass(evt.target.value)
    }

    const handleLoginButton=()=>{
        axios.get("http://localhost:9090/vendor/login/"+uid+"/"+upass).then((res)=>{
            if(res.data.VId!=undefined)
            {
                const root = ReactDOM.createRoot(document.getElementById("root"))
                var obj={
                    vfname:res.data.VendorName,
                    vpicname:res.data.VPicName,
                    vid:res.data.VId
                }
                root.render(<VendorHome data={obj}></VendorHome>)
            }
            else{
                alert("Invalid Id/Password")
            }
        })
    }

    return(
        <div>
            <center>
            <h5 style={{color:"blue",backgroundColor:"Yellow"}}>Vendor Login Form</h5>
            <table>
            <tr>
                <td>User Id</td>
                <td>
                    <input type="text" onChange={handleUIdText} className="form-control" />
                </td>
           </tr>
           <tr>
                <td>Password</td>
                <td>
                    <input type="password" onChange={handleUPassText} className="form-control" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
                </td>
            </tr>
            </table>
            </center>
        </div>
    )
}
export default VendorLogin