import React from "react"
import ProductList from "../productsviews/ProductList"
import ReactDOM from "react-dom/client"

function CustomerHome(props)
{
    const handleShoppingButton=()=>{
        const root = ReactDOM.createRoot(document.getElementById("root"))
        var cid = props.data.cid
        // alert(cid)
        root.render(<ProductList data={cid}></ProductList>)
    }

    return(
        <div>
            Customer Id <span>  </span> {props.data.cid}
            <h4 style={{backgroundColor:"yellow"}}>Customer Home Page</h4>
            <h5>Welcome  {props.data.cfname}</h5>
            <img src={"http://localhost:9090/customer/getcustomerimage/"+props.data.cpicname} height={100} width={100} />
            <span>           </span>
            <button className="btn btn-primary" type="submit" onClick={handleShoppingButton}> Shopping</button>
        </div>
    )
}
export default CustomerHome