import React,{useState} from "react"
import axios from "axios"

function UpdateCity()
{
    const[ctid,setCtId]=useState()
    const[ctname,setCtName]=useState()
    const[stid,setStId]=useState()

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value)
    }
    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value)
    }
    const handleStIdText=(evt)=>{
        setStId(evt.target.value)
    }

    const handleSearchCityButton=()=>{
        axios.get("http://localhost:9090/city/citysearch/"+ctid).then((res)=>{
            setStId(res.data.stid)
            setCtName(res.data.ctname)
            if(res.data.ctid!=ctid)
            {
                alert('data not found')
                setCtName(" ")
                setStId(" ")
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleUpdateCityButton=()=>{
        axios.put("http://localhost:9090/city/cityupdate/"+ctid+'/'+ctname+'/'+stid).then((res)=>{
            alert(res.statusText)
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>City Update By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter City Id</td>
                            <td>
                                <input type="number" onChange={handleCtIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>City Name</td>
                            <td>
                                <input type="text" onChange={handleCtNameText} value={ctname}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter State Id</td>
                            <td>
                                <input type="number" onChange={handleStIdText} value={stid}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSearchCityButton} className="btn btn-primary"> Search</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleUpdateCityButton} className="btn btn-secondary"> Update</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default UpdateCity