import React,{useState,useEffect} from "react"
import axios from "axios"
import CustomerHome from "./CustomerHome"
import ReactDOM from "react-dom/client"

function CustomerLogin()
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
        var obj={
            cuserid:uid,
            cuserpass:upass
        }
        axios.post("http://localhost:9090/customer/customerlogin",obj).then((res)=>{
            if(res.data.cuserid!=undefined)
            {
                const root = ReactDOM.createRoot(document.getElementById("root"))
                var obj={
                    cfname:res.data.cname,
                    cpicname:res.data.cpicname,
                    cid:res.data.cid
                }
                root.render(<CustomerHome data={obj}></CustomerHome>)
            }
            else{
                alert("Invalid Id/Password")
            }
        })
    }

    return(
        <div>
            <center>
            <h5 style={{color:"blue",backgroundColor:"Yellow"}}>Customer Login Form</h5>
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
export default CustomerLogin