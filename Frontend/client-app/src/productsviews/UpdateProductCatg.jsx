import React,{useState} from "react"
import axios from "axios"

function UpdateProductCatg()
{
    const[pcatgid,setPCatgId]=useState()
    const[pcatgname,setPCatgName]=useState()

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value)
    }
    const handlePCatgNameText=(evt)=>{
        setPCatgName(evt.target.value)
    }

    const handleSearchPCatgButton=()=>{
        axios.get("http://localhost:9090/productcatg/productcatgsearch/"+pcatgid).then((res)=>{
            setPCatgName(res.data.pcatgname)
            setPCatgId(res.data.pcatgid)
            if(res.data.pcatgid!=pcatgid)
            {
                alert('data not found')
                setPCatgName(" ")
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleUpdatePCatgButton=()=>{
        axios.put("http://localhost:9090/productcatg/productcatgupdate/"+pcatgid+'/'+pcatgname).then((res)=>{
            alert(res.statusText)
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>Product Category Update By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter PCatg Id</td>
                            <td>
                                <input type="number" onChange={handlePCatgIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>PCatg Name</td>
                            <td>
                                <input type="text" onChange={handlePCatgNameText} value={pcatgname}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSearchPCatgButton} className="btn btn-primary"> Search</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleUpdatePCatgButton} className="btn btn-secondary"> Update</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default UpdateProductCatg