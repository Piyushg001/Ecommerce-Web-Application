import React,{useState} from "react"
import axios from "axios"

function DeleteProductCatg()
{
    const[pcatgid,setPCatgId]=useState()
    const[pcatgname,setPCatgName]=useState()

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value)
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

    const handleDeletePCatgButton=()=>{
        axios.delete("http://localhost:9090/productcatg/productcatgdelete/"+pcatgid).then((res)=>{
            alert(res.data)
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>Product category Delete By ID</h4>
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
                            <td>{pcatgname}</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSearchPCatgButton} className="btn btn-primary"> Search</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleDeletePCatgButton} className="btn btn-danger"> Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default DeleteProductCatg