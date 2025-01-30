import React, {useState, useEffect} from "react"
import axios from "axios"
import cart from "../images/cart.jpg"
import MyCart from "./MyCart"
import ReactDOM from "react-dom/client"

function ProductList(props)
{
    const[plist,setPList]=useState([])
    const[itemcount,setItemCount]=useState(0)
    const[buylist,setBuyList]=useState([])
    // const[cid,setCId]=useState()
        
    useEffect(()=>{
      axios.get("http://localhost:9090/product/productshow").then((res)=>{
        setPList(res.data)
      }).catch(err=>{
        alert(err)
      })  
    },[])
    
    const handleBuyButton=(item)=>{
        alert(item.pname+" is added in cart")
        setItemCount(itemcount+1)
        buylist.push(item)
        // alert("buy items count = "+buylist.length)
    }

    const handleShowCart=()=>{
      var cid = props.data
      var obj = {
        selitems : buylist,
        cid : cid,
      }
      const root = ReactDOM.createRoot(document.getElementById("root"))
      root.render(<MyCart data={obj}></MyCart>)
    }

    return(
        <div>
            <div>
              <label>Customer ID <span>  </span> {props.data} </label>
              <hr/>
                <img src={cart} height={80} width={80} />
                <label>{itemcount}</label>
                <br/>
                <button type="submit" onClick={handleShowCart} className="btn btn-success" >Show Cart</button>
            </div>
            <center>
              <br/>
            <h5 style={{color:"blue",backgroundColor:"grey"}}>Shopping Product List</h5>
            <table style={{backgroundColor:"beige"}} cellPadding={10}>
              <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Offer Price</th>
                  <th>Category ID</th>
                  <th>Photo</th>
                  <th>Action</th>
              </tr>
              {
                plist.map((item)=>(
                  <tr>
                    <td>{item.pid}</td>
                    <td>{item.pname}</td>
                    <td>{item.pprice}</td>
                    <td>{item.oprice}</td>
                    <td>{item.pcatgid}</td>
                      <td>
                    <img src={"http://localhost:9090/product/getproductimage/"+item.ppicname} height={50} width={80}  />
                      </td>
                    <td>
                      <button type="submit" className="btn btn-primary" onClick={()=>{handleBuyButton(item)}}> Buy</button>
                    </td>
                  </tr>
                ))
              }
            </table>
            </center>
        </div>
    )

}
export default ProductList