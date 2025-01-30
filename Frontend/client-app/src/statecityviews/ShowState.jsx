import React,{useState,useEffect} from "react"
import axios from "axios"

function ShowState()
{
    const[stlist,setStList]=useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:9090/state/stateshow").then((res)=>{
            setStList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    })
    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>State Name List</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <th>State ID</th>
                            <th>State Name</th>
                        </tr>
                        { stlist.map((item)=>(
                        <tr>
                            <td>{item.stid}</td>
                            <td>{item.stname}</td>
                        </tr>
                        ))}
                    </table>
                </div>
            </center>
        </div>
    )
} export default ShowState