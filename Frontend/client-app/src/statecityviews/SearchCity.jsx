import React,{useState} from "react"
import axios from "axios"

function SearchCity()
{
    const[ctid,setCtId]=useState()
    const[ctname,setCtName]=useState()
    const[stid,setStId]=useState()
    const[CTID,setCTID]=useState()

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value)
    }

    const handleSearchCityButton=()=>{
        axios.get("http://localhost:9090/city/citysearch/"+ctid).then((res)=>{
            setCtName(res.data.ctname)
            setStId(res.data.stid)
            if(res.data.ctid!=ctid)
            {
                alert('data not found')
                setCTID(" ")
            }
            else{
                 setCTID(res.data.ctid)
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>city Search By ID</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <td>Enter city Id</td>
                            <td>
                                <input className="form-control" type="number" onChange={handleCtIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <td>city Id</td>
                            <td>{CTID}</td>
                        </tr>
                        <tr>
                            <td>city Name</td>
                            <td>{ctname}</td>
                        </tr>
                        <tr>
                            <td>State Id</td>
                            <td>{stid}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" onClick={handleSearchCityButton} className="btn btn-primary" >Search</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )
} export default SearchCity