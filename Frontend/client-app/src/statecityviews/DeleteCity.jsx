import React,{useState} from "react"
import axios from "axios"

function DeleteCity()
{
    const[ctid,setCtId]=useState()
    const[ctname,setCtName]=useState()
    const[stid,setStId]=useState()

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value)
    }

    const handleSearchCityButton=()=>{
        axios.get("http://localhost:9090/city/citysearch/"+ctid).then((res)=>{
            setCtName(res.data.ctname)
            setStId(res.data.stid)
            setCtId(res.data.ctid)
            if(res.data.ctid!=ctid)
            {
                alert('data not found')
                setCtName(" ")
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleDeleteCityButton=()=>{
        axios.delete("http://localhost:9090/city/citydelete/"+ctid).then((res)=>{
            alert(res.data)
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>City Delete By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter City Id</td>
                            <td>
                                <input type="number" onChange={handleCtIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Citye Name</td>
                            <td>{ctname}</td>
                        </tr>
                        <tr>
                            <td>State Id</td>
                            <td>{stid}</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSearchCityButton} className="btn btn-primary"> Search</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleDeleteCityButton} className="btn btn-danger"> Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default DeleteCity