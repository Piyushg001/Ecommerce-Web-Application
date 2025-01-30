import React,{useState,useEffect} from "react"
import axios from "axios"

function ShowCity()
{
    const[stlist,setStList]=useState([])
    const[ctlist,setCtList]=useState([])
    var sname=" "
    
    useEffect(()=>{
        axios.get("http://localhost:9090/state/stateshow").then((res)=>{
            setStList(res.data)
        }).catch((err)=>{
            alert(err)
        })
        axios.get("http://localhost:9090/city/cityshow").then((res)=>{
            setCtList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])
    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>City Name List</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <th>City ID</th>
                            <th>City Name</th>
                            <th>State Name</th>
                        </tr>
                        { ctlist.map((item)=>(
                            
                        <tr>
                            <td>{item.ctid}</td>
                            <td>{item.ctname}</td>
                            <td>
                                {
                                stlist.map((subitem)=>{
                                    if(item.stid==subitem.stid)
                                    {
                                        sname=subitem.stname
                                    }
                                })
                            }
                            {
                                sname
                            }
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
            </center>
        </div>
    )
} export default ShowCity