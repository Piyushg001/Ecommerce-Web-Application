import React,{useState,useEffect} from "react"
import axios from "axios"

function CustomerReg()
{
    const[cid,setCId]=useState()
    const[cname,setCName]=useState()
    const[ccontactno,setCContactNo]=useState()
    const[cemail,setCEmail]=useState()
    const[caddress,setCAddress]=useState()
    const[cstid,setCStId]=useState()
    const[cctid,setCtId]=useState()
    const[cuserid,setCUserId]=useState()
    const[cuserpass,setCUserPass]=useState()
    const[cpicname,setCPicName]=useState()
    const[ctlist,setCtList]=useState([])
    const[stlist,setStList]=useState([])

    const[image, setImage] = useState({preview:" ", data:" "})
    const[status,setStatus]= useState(' ')

    const handleCIdText=(evt)=>{
        setCId(evt.target.value)
    }
    const handleCNameText=(evt)=>{
        setCName(evt.target.value)
    }
    const handleCContactNoText=(evt)=>{
        setCContactNo(evt.target.value)
    }
    const handleCEmailText=(evt)=>{
        setCEmail(evt.target.value)
    }
    const handleCAddressText=(evt)=>{
        setCAddress(evt.target.value)
    }
    
    const handleStateSelect=(evt)=>{
        setCStId(evt.target.value)
        axios.get("http://localhost:9090/city/citybystate/"+evt.target.value).then((res)=>{
            setCtList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleCitySelect=(evt)=>{
        setCtId(evt.target.value)
    }
    const handleCUserIdText=(evt)=>{
        setCUserId(evt.target.value)
    }
    const handleCUserPassText=(evt)=>{
        setCUserPass(evt.target.value)
    }
    
    //load state city
    useEffect(()=>{
        axios.get("http://localhost:9090/city/citybystate/"+1).then((res)=>{
            setCtList(res.data)
        }).catch(err=>{
            alert(err)
        })
        axios.get("http://localhost:9090/state/stateshow").then((res)=>{
            setStList(res.data)
        }).catch((err)=>{
            alert(err)
        })
        
        // get new customer id
        axios.get("http://localhost:9090/customer/getnewcustomerid").then((res)=>{
            // setCId(res.data[0].cid+1)
            setCId(res.data.length+1)
        }).catch(err=>{
            alert(err)
        })
    }, [])
    
    // Register Button Code
    const handleRegisterButton=()=>{
        const obj = {
            cid: cid,
            cname: cname,
            ccontactno: ccontactno,
            cemail: cemail,
            caddress: caddress,
            cstid: cstid,
            cctid: cctid,
            cuserid: cuserid,
            cuserpass: cuserpass,
            cpicname: cpicname
        }        
        axios.post('http://localhost:9090/customer/customerreg',obj).then((res)=>{
            alert("registration done")
        }).catch(err=>{
            alert(err)
        })
    }

    // save customer image code
    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch("http://localhost:9090/customer/savecustomerimage/", {
            method: "POST",
            body : formData,
        })
        if(response){
            if(response.statusText=="OK")
            {
                setStatus("File Uploaded succesfully")
                alert(status)
            }
            else{
                setStatus("failed to upload file")
                alert(status)
            }
        }
    }

    const handleFileChange= (evt) =>{
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setCPicName(evt.target.files[0].name)
    }

    return(
        <div>
            <center>
            <h5 style={{color:"blue",backgroundColor:"Yellow"}}>Customer Registration</h5>
            </center>
            <center>
            <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"820px"}}>
                <center>
                    <table border={1}>
                        <tr>
                            <td>Customer Id</td>
                            <td>{cid}</td>
                        </tr>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="text" onChange={handleCUserIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleCUserPassText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Customer Name</td>
                            <td>
                                <input type="text" onChange={handleCNameText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td>
                                <input type="Number" onChange={handleCContactNoText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text" onChange={handleCEmailText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                <input type="text" onChange={handleCAddressText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>
                                <select onClick={handleStateSelect}>
                                {
                                    stlist.map((item)=>(
                                        <option value={item.stid}>{item.stname}</option>
                                    ))
                                }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>City Name</td>
                            <td>
                                <select onClick={handleCitySelect}>
                                {
                                    ctlist.map((item)=>(
                                        <option value={item.ctid}>{item.ctname}</option>
                                    ))
                                }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Select Photo</td>
                            <td>
                                <input type="file" name="file" onChange={handleFileChange}/>
                                <img src={image.preview} width="100" height="100"/> 
                            </td>
                        </tr>
                        <tr>
                            <td>Click to Upload Product Photo</td>
                            <td>
                                <button type="submit" onClick={handleSubmit}>Upload</button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            <button type="submit" onClick={handleRegisterButton}>Register</button>
                            </td>
                        </tr>
                    </table>
                </center>
            </div>
            </center>
        </div>
    )
}
export default CustomerReg