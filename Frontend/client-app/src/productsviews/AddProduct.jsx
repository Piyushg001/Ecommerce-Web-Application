import React, {useState, useEffect} from "react"
import axios from "axios"

function AddProduct(props)
{
    var vid = props.data.vid

    const[pid,setPId]=useState()
    const[pname,setPName]=useState()
    const[pprice,setPPrice]=useState()
    const[oprice,setOPrice]=useState()
    const[ppicname,setPPicName]=useState()
    const[pcatgid,setPCatgId]=useState()
    const[pcatglist,setPCatgList]=useState([])
    const[plist,setPList]=useState([])
    const[image,setImage]=useState({preview:" ",data:" "})
    const[status,setStatus]=useState(" ")

    const handlePIdText=(evt)=>{
        setPId(evt.target.value)
    }
    const handlePNameText=(evt)=>{
        setPName(evt.target.value)
    }
    const handlePPriceText=(evt)=>{
        setPPrice(evt.target.value)
    }
    const handleOPriceText=(evt)=>{
        setOPrice(evt.target.value)
    }

    const handleSelectPCatgId=(evt)=>{
        setPCatgId(evt.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:9090/productcatg/productcatgshow").then((res)=>{
            setPCatgList(res.data)
    }).catch(err=>{
        alert(err)
    })
    axios.get("http://localhost:9090/product/getproductid").then((res)=>{
        setPId(res.data[0].pid+1)
       // setPId(res.data.length+1)
    }).catch((err)=>{
        alert(err)
    })
    },[])

    const handleSaveButton=()=>{
        var obj={
            pid:pid,
            pname:pname,
            pprice:pprice,
            oprice:oprice,
            ppicname:ppicname,
            pcatgid:pcatgid,
            VId:vid
        }
        axios.post("http://localhost:9090/product/productsave/",obj).then((res)=>{
            alert("data saved")
        }).catch(err=>{
            alert(err)
        })
    }

    const handleShowButton=()=>{
        axios.get("http://localhost:9090/product/productshow/"+vid).then((res)=>{
            setPList(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    //browse and save image code
    const handleSubmitButton = async (evt) =>{
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch("http://localhost:9090/product/productimagesave/", {
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
        setPPicName(evt.target.files[0].name)
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white', borderRadius:"20px"}}>Product Form</h4>
            <h4 style={{color:'Red'}}>Vendor Id :- <span>   </span> {vid}</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"820px"}}>
                    <table>
                        <tr>
                            <td>Product Id</td>
                            <td>{pid}</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input type="text" className="form-control" onChange={handlePNameText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Product Price</td>
                            <td>
                                <input type="number" className="form-control" onChange={handlePPriceText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Offer Price</td>
                            <td>
                                <input type="number" className="form-control" onChange={handleOPriceText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Product Category</td>
                            <td>
                                <select onClick={handleSelectPCatgId}>
                                    {
                                        pcatglist.map((item)=>(
                                          <option value={item.pcatgid}>{item.pcatgname}</option>  
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
                                <button type="submit" className="btn btn-primary" onClick={handleSubmitButton}>Upload</button>
                            </td>
                            <td>
                                <button type="submit" className="btn btn-success" onClick={handleSaveButton}>Save</button>
                            </td>
                            <td>
                                <button type="submit" className="btn btn-secondary" onClick={handleShowButton}>Show</button>
                            </td>
                        </tr>
                    </table>
                    <p style={{backgroundColor:"grey",color:"blue"}}>Product List</p>
                    <table border={1} align="center" cellPadding={10}>
                        <tr>
                            <th>SNo.</th>
                            <th>P Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category ID</th>
                            <th>Photo</th>
                        </tr>
                        {
                            plist.map((item,index)=>(
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{item.pid}</td>
                                    <td align="center">{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>
                                    <td>{item.pcatgid}</td>
                                    <td>
                                        <img src={"http://localhost:9090/product/getproductimage/"+item.ppicname} height={50} width={80}  />
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    )
}
export default AddProduct