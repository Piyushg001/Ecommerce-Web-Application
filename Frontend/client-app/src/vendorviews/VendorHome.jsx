import React from "react"
import AddProduct from "../productsviews/AddProduct"
import ShowProduct from "../productsviews/ShowProduct"
import ReactDOM from "react-dom/client"

function VendorHome(props)
{
    var pprops = props.data

    const handleAddNewProduct=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'))
        root.render(<AddProduct data={pprops}></AddProduct>) 
    }

    const handleShowProduct=()=>{
        const root = ReactDOM.createRoot(document.getElementById("root"))
        root.render(<ShowProduct data={pprops}></ShowProduct>)
    }

    return(
        <div>
            Vendor Id <span>  </span> {props.data.vid}
            <h4 style={{backgroundColor:"yellow"}}>Vendor Home Page</h4>
            <h5>Welcome  {props.data.vfname}</h5>
            <img src={"http://localhost:9090/vendor/getimage/"+props.data.vpicname} height={100} width={100} />
            <span>           </span>
            <button className="btn btn-primary" type="submit" onClick={handleShowProduct}> Show Products</button>
            <button className="btn btn-primary" type="submit" onClick={handleAddNewProduct}> Add Products</button>
        </div>
    )
}
export default VendorHome