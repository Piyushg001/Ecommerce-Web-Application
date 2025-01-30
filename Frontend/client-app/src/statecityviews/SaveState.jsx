import React,{useState} from "react"
import axios from "axios"

function SaveState()
{
    const[stid,setStId]=useState()
    const[stname,setStName]=useState()

    const handleStIdText=(evt)=>{
        setStId(evt.target.value)
    }

    const handleStNameText=(evt)=>{
        setStName(evt.target.value)
    }

    const handleAddNewStateButton=()=>{
        setStId(" ")
        setStName(" ")
        axios.get("http://localhost:9090/state/getstateid").then((res)=>{
            setStId(res.data[0].stid+1)
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleSaveStateButton=()=>{
        axios.post("http://localhost:9090/state/statesave/"+stid+'/'+stname).then((res)=>{
            alert(res.statusText)
        }).catch((err)=>{
            alert(err)
        })
    }
    return(
        <div>
            <center>
                <h4 style={{backgroundColor:"green",color:'white'}}>State Entry Form</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>State ID</td>
                            <td>
                                {/* <input type="text" className="form-control" value={stid}/> */}
                                {stid}
                            </td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>
                                <input type="text" className="form-control" value={stname} onChange={handleStNameText}/>
                            </td>
                        </tr>
                        <tr>
                            <td><button type="submit" onClick={handleAddNewStateButton} className="btn btn-primary">Add New</button></td>
                            <td><button type="submit" onClick={handleSaveStateButton} className="btn btn-secondary">Save</button></td> 
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
}export default SaveState