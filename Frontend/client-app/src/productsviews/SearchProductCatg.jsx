import React,{useState} from "react"
import axios from "axios"

function SearchProductCatg()
{
    const[pcatgid,setPCatgId]=useState()
    const[pcatgname,setPCatgName]=useState()

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value)
    }

    const handleSearchPCatgButton=()=>{
        axios.get("http://localhost:9090/productcatg/productcatgsearch/"+pcatgid).then((res)=>{
            setPCatgName(res.data.pcatgname)
            if(res.data.pcatgid!=pcatgid)
            {
                alert('data not found')
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>Product Category Search By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter PCatg Id</td>
                            <td>
                                <input className="form-control" type="number" onChange={handlePCatgIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>{pcatgname}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" onClick={handleSearchPCatgButton} className="btn btn-primary" >Search</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default SearchProductCatg