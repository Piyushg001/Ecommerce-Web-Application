import React,{useState,useEffect} from "react"
import axios from "axios"

function VendorReg()
{
    const[vuserid,setVUserId]=useState()
    const[vuserpass,setVUserPass]=useState()
    const[vendorname,setVendorName]=useState()
    const[vaddress,setVAddress]=useState()
    const[vcontact,setVContact]=useState()
    const[vemail,setVEmail]=useState()
    const[vpicname,setVPicName]=useState()
    const[vid,setVId]=useState()

    const[image, setImage] = useState({preview:" ", data:" "})
    const[status,setStatus]= useState(' ')

    const handleVUserIdText=(evt)=>{
        setVUserId(evt.target.value)
    }
    const handleVUserPassText=(evt)=>{
        setVUserPass(evt.target.value)
    }
    const handleVendorNameText=(evt)=>{
        setVendorName(evt.target.value)
    }
    const handleVAddressText=(evt)=>{
        setVAddress(evt.target.value)
    }
    const handleVContactText=(evt)=>{
        setVContact(evt.target.value)
    }
    const handleVEmailText=(evt)=>{
        setVEmail(evt.target.value)
    }
    const handleVIdText=(evt)=>{
        setVId(evt.target.value)
    }

    // get vendor count
    axios.get("http://localhost:9090/vendor/getvendorcount").then((res)=>{
        // setvuserid(res.data[0].vuserid+1)
        setVId(res.data.length+1)
    }).catch(err=>{
        alert(err)
    })
    
    // Register Button Code
    const handleRegisterButton=()=>{
        const obj = {
            VUserId: vuserid,
            VUserPass: vuserpass,
            VendorName: vendorname,
            VAddress: vaddress,
            VContact: vcontact,
            VEmail: vemail,
            VPicName: vpicname,
            VId: vid
        }        
        axios.post('http://localhost:9090/vendor/register',obj).then((res)=>{
            alert(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    // browse and save image code
    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch("http://localhost:9090/vendor/savevendorimage/", {
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
        setVPicName(evt.target.files[0].name)
    }

    return(
        <div>
            <center>
            <h5 style={{color:"blue",backgroundColor:"Yellow"}}>Vendor Registration Form</h5>
            </center>
            <center>
            <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"820px"}}>
                <center>
                    <table border={1}>
                        <tr>
                            <td>Vendor Id</td>
                            <td>{vid}</td>
                        </tr>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="text" onChange={handleVUserIdText} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleVUserPassText} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Vendor Name</td>
                            <td>
                                <input type="text" onChange={handleVendorNameText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                <input type="text" onChange={handleVAddressText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td>
                                <input type="Number" onChange={handleVContactText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input type="text" onChange={handleVEmailText}/>
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
                            <td>Click to Upload Vendor Photo</td>
                            <td>
                                <button type="submit" onClick={handleSubmit}>Upload</button>
                            </td>
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
export default VendorReg