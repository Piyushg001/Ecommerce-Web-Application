import React,{useState} from "react"
import axios from "axios"

function SearchState()
{
    const[stid,setStId]=useState()
    const[stname,setStName]=useState()

    const handleStIdText=(evt)=>{
        setStId(evt.target.value)
    }

    const handleSearchStateButton=()=>{
        axios.get("http://localhost:9090/state/statesearch/"+stid).then((res)=>{
            setStName(res.data.stname)
            if(res.data.stid!=stid)
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
            <h4 style={{backgroundColor:"green",color:'white'}}>State Search By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter State Id</td>
                            <td>
                                <input className="form-control" type="number" onChange={handleStIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>State Id</td>
                            <td>{stid}</td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>{stname}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" onClick={handleSearchStateButton} className="btn btn-primary" >Search</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default SearchState