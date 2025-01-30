import React, {useState, useEffect} from "react"
import axios from "axios"
import Bill from "../customerviews/Bill"
import ReactDOM from "react-dom/client"

function MyCart(props)
{
    var total = 0
    
    const handlePayNowButton=()=>{
        var obj = props.data
        const root = ReactDOM.createRoot(document.getElementById("root"))
        root.render(<Bill data={obj}></Bill>)
    }

    return(
        <div>
            <center>
                <label>Customer Id - <span>    </span> {props.data.cid} </label>
            <h4 style={{backgroundColor:"green",color:'white',borderRadius:'50px'}}>Purchased Product List</h4>
            <table cellPadding={10}>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Offer Price</th>
                    <th>Photo</th>
                </tr>
                {
                    props.data.selitems.map((item)=>(
                        <tr>
                            <td>{item.pid}</td>
                            <td>{item.pname}</td>
                            <td>{item.pprice}</td>
                            <td>{item.oprice}</td>
                            <td><img src={"http://localhost:9090/product/getproductimage/"+item.ppicname} height={25} width={25} /></td>
                        </tr>
                    ))
                }
            </table>
            {
                props.data.selitems.map((item)=>{
                    total = total + item.oprice
                })
            }
            <h4 style={{backgroundColor:"beige",color:"blueviolet",borderRadius:'50px'}}>Total Amount :- <span>    </span> {total}</h4>
            <button type="submit" onClick={handlePayNowButton} className="btn btn-danger">Pay Now</button>
            </center>
        </div>
    )
} export default MyCart