import React,{useState} from "react"
import axios from "axios"

function DeleteState()
{
    const[stid,setStId]=useState()
    const[stname,setStName]=useState()

    const handleStIdText=(evt)=>{
        setStId(evt.target.value)
    }

    const handleSearchStateButton=()=>{
        axios.get("http://localhost:9090/state/statesearch/"+stid).then((res)=>{
            setStName(res.data.stname)
            setStId(res.data.stid)
            if(res.data.stid!=stid)
            {
                alert('data not found')
                setStName(" ")
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const handleDeleteStateButton=()=>{
        axios.delete("http://localhost:9090/state/statedelete/"+stid).then((res)=>{
            alert(res.data)
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>State Delete By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter State Id</td>
                            <td>
                                <input type="number" onChange={handleStIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>{stname}</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleSearchStateButton} className="btn btn-primary"> Search</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleDeleteStateButton} className="btn btn-danger"> Delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default DeleteState