import React, {useState, useEffect} from "react"
import axios from "axios"

function ShowProduct(props)
{
    const[plist,setPList]=useState([])
    
    var vid = props.data.vid
    useEffect(()=>{
        axios.get("http://localhost:9090/product/productshow/"+vid).then((res)=>{
            setPList(res.data)
        }).catch(err=>{
            alert(err)
        })
    },[])

    return(
        <div>
            <center>
                <h6>Vendor Id :- <span>   </span> {props.data.vid}</h6>
            <h4 style={{backgroundColor:"green",color:'white'}}>Product List</h4>
                <div style={{backgroundColor:"beige",border:'solid',borderRadius:'50px',width:"800px"}}>
                    <table border={1} align="center" cellPadding={10}>
                        <tr>
                            <th>SNo.</th>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category ID</th>
                            <th>Photo</th>
                        </tr>
                        {
                            plist.map((item, index)=>(
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{item.pid}</td>
                                    <td align="center">{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>
                                    <td>{item.pcatgid}</td>
                                    <td>
                                        <img src={"http://localhost:9090/product/getproductimage/"+item.ppicname} height={50} width={80}  />
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    )
}
export default ShowProduct