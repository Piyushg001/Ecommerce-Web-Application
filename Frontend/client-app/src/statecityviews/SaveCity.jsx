import React,{useEffect, useState} from "react"
import axios from "axios"

function SaveCity()
{
    const[ctid,setCtId]=useState()
    const[ctname,setCtName]=useState()
    const[stid,setStId]=useState()
    const[stlist,setStList]=useState([])

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value)
    }
    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value)
    }
    const handleSelectState=(evt)=>{
        setStId(evt.target.value)
    }

    const handleAddNewCityButton=()=>{
        setCtId(" ")
        setCtName(" ")
        setStId(" ")
        axios.get("http://localhost:9090/city/getcityid").then((res)=>{
            setCtId(res.data[0].ctid+1)
        }).catch(err=>{
            alert(err)
        })
    }

    const handleSaveCityButton=()=>{
        var obj={
            ctid:ctid,
            ctname:ctname,
            stid:stid
        }
        axios.post('http://localhost:9090/city/citysave/',obj).then((res)=>{
            alert(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:9090/state/stateshow').then((res)=>{
            setStList(res.data)
        }).catch(err=>{
            alert(err)
        })
    })

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white',borderRadius:'50px'}}>City Entry Form</h4>
                <div className="jumbotron" style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>City Id</td>
                            <td>
                                <input type="number" className="form-control" value={ctid} />
                            </td>
                        </tr>
                        <tr>
                            <td>City Name</td>
                            <td>
                                <input type="text" className="form-control" value={ctname} onChange={handleCtNameText} /> 
                            </td>
                        </tr>
                        <tr>
                            <td>Select State</td>
                            <td>
                                <select onClick={handleSelectState}>
                                    {
                                        stlist.map((item)=>(
                                            <option value={item.stid}>{item.stname}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><button className="btn btn-primary" onClick={handleAddNewCityButton}>Add New</button></td>
                
                            <td><button className="btn btn-secondary" onClick={handleSaveCityButton}>Save City</button></td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
}
export default SaveCity