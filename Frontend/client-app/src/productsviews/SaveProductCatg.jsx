import React,{useEffect, useState} from "react"
import axios from "axios"

function SaveProductCatg()
{
    const[pcatgid,setPCatgId]=useState()
    const[pcatgname,setPCatgName]=useState()
    const[pcatglist,setPCatgList]=useState([])

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value)
    }
    const handlePCatgNameText=(evt)=>{
        setPCatgName(evt.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:9090/productcatg/productcatgshow").then((res)=>{
            setPCatgList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])

    const handleAddNewPCatgButton=()=>{
        setPCatgId(" ")
        setPCatgName(" ")
        axios.get("http://localhost:9090/productcatg/getproductcatgid").then((res)=>{
            setPCatgId(res.data[0].pcatgid+1)
        }).catch(err=>{
            alert(err)
        })
    }

    const handleSavePCatgButton=()=>{
        var obj={
            pcatgid:pcatgid,
            pcatgname:pcatgname,
        }
        axios.post('http://localhost:9090/productcatg/productcatgsave/'+pcatgid+'/'+pcatgname).then((res)=>{
            alert(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white',borderRadius:'50px'}}>Product Category Entry Form</h4>
                <div className="jumbotron" style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>PCatg Id</td>
                            <td>
                                <input type="number" className="form-control" value={pcatgid} />
                            </td>
                        </tr>
                        <tr>
                            <td>PCatg Name</td>
                            <td>
                                <input type="text" className="form-control" value={pcatgname} onChange={handlePCatgNameText} /> 
                            </td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-primary" onClick={handleAddNewPCatgButton}>Add New</button></td>
                
                            <td><button className="btn btn-secondary" onClick={handleSavePCatgButton}>Save PCatg</button></td>
                        </tr>
                    </table>
                    <p style={{color:"blue",backgroundColor:"grey"}}>Product Category List</p>
                    <table>
                        <tr>
                            <th>PCatg ID</th>
                            <th>PCatg Name</th>
                        </tr>
                        { pcatglist.map((item)=>(
                        <tr>
                            <td>{item.pcatgid}</td>
                            <td>{item.pcatgname}</td>
                        </tr>
                        ))}
                    </table>
                </div>
            </center>
        </div>
    )
}
export default SaveProductCatg