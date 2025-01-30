import React,{useState,useEffect} from "react"
import axios from "axios"

function ShowProductCatg()
{
    const[pcatglist,setPCatgList]=useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:9090/productcatg/productcatgshow").then((res)=>{
            setPCatgList(res.data)
        }).catch((err)=>{
            alert(err)
        })
    })
    return(
        <div>
            <center>
            <h4 style={{backgroundColor:"green",color:'white'}}>Product Category List</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"400px"}}>
                    <table>
                        <tr>
                            <th>PCatg ID</th>
                            <th>PCatg Name</th>
                        </tr>
                        { pcatglist.map((item)=>(
                        <tr>
                            <td>{item.pcatgid}</td>
                            <td>{item.pcatgname}</td>
                        </tr>
                        ))}
                    </table>
                </div>
            </center>
        </div>
    )
} export default ShowProductCatg