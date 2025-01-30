import React,{useState, useEffect} from "react";
import axios from "axios"

function Bill(props)
{
    
    const[mydate,setMyDate]=useState()
    const[custdate,setCustDate]=useState()
    const[cname,setCNAme]=useState()
    const[caddress,setCAddress]=useState()
    const[ccontact,setCContact]=useState()
    const[sitems,setSItems]=useState([])
    const[billid,setBillId]=useState()

    var total = 0

    useEffect(()=>{
        // get customers details
        axios.get("http://localhost:9090/customer/customerdetails/"+props.data.cid).then((res)=>{
            setCNAme(res.data.cname)
            setCAddress(res.data.caddress)
            setCContact(res.data.ccontactno)
            mydateFun()
        }).catch((err)=>{
            alert(err)
        }) 

        // get next bill id
        axios.get("http://localhost:9090/bill/getbillid").then((res)=>{
            setBillId(res.data.length +1)
            //setBillId(res.data[0].billId +1)
            mydateFun()
        }).catch(err=>{
            alert(err)
        })
    },[])

    function mydateFun()
    {
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let currentDate = `${day}-${month}-${year}`
        console.log(currentDate)
        setMyDate(currentDate)
    }

    const handlePayNowButton=async()=>{
        alert("Payment process im progress...")
        props.data.selitems.map((item)=>{
            var obj={
                billid:billid,
                billdate:mydate,
                cid:props.data.cid,
                pid:item.pid
            }
            //alert(mydate)
            //save bill details
            axios.post("http://localhost:9090/bill/billsave/",obj).then((res)=>{
                alert("Bill Saved")
            }).catch((err)=>{
                alert(err)
            })
        })

        //call payment gateway script
        displayRazorpay()
    }

    function loadScript(src)
    {
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src
            script.onload = () =>{
                resolve(true)
            }
            script.onerror = () =>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function displayRazorpay()
    {
        const res = await loadScript("http://checkout.razorpay.com/v1/checkout.js")

        if(!res)
        {
            alert("Razorpay SDK Failed to load. Are you online?")
            return
        }

        var myamount = total*100

        //creating a new order
        const result = await axios.post("http://localhost:9090/payment/orders/"+myamount)

        if(!result)
        {
            alert("srver error. Are you Online")
            return
        }

        // getting the order details back
        const { amount, id: order_id, currency } = result.data

        const options = {
            key: "rzp_test_8CxHBNuMQt1Qn8",
            amount: amount.toString(),
            currency: currency,
            name: "Universal Informatics Pvt. Ltd. Indore",
            description: "Test Transaction",
            // image: {logo},
            order_id: order_id,
            handler: async function (response)
            {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                }
                alert(data.razorpayPaymentId)
                const result =  await axios.post("http://localhost:9090/payment/success",data)

                alert(result.data)
            },
            prefill:{
                name: "Universal Informatics",
                email: "Universal@gmail.com",
                contact: "07280-224563",
            },
            notes: {
                address: "Universal Informatics Indore"
            },
            theme: {
                color: "#61dafb"
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return(
        <div>
            <center>
                <h4 style={{backgroundColor:"green"}}>Bill</h4>
                <table cellPadding={10}>
                    <tr>
                        <td>Bill Id</td>
                        <td>{billid}</td>
                    </tr>
                    <tr>
                        <td>Customer Id</td>
                        <td>{props.data.cid}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{cname}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{caddress}</td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>{ccontact}</td>
                    </tr>
                    <tr>
                        <td>Bill Date</td>
                        <td>{mydate}</td>
                    </tr>
                </table>

                <center>
                    <hr/>
                    <table border="1" cellPadding={10}>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Photo</th>
                        </tr>
                        {
                            props.data.selitems.map((item)=>(
                                <tr>
                                    <td>{item.pid}</td>
                                    <td align="center">{item.pname}</td>
                                    <td>{item.oprice}</td>
                                    <td>
                                    <img src={"http://localhost:9090/product/getproductimage/"+item.ppicname} height="50" width="50" />
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                    {
                        props.data.selitems.map((item)=>{
                        total = total + item.oprice
                        })
                    }
                <h4 style={{backgroundColor:"beige",color:"slateblue",borderRadius:'50px'}}>Total Amount :- <span>    </span> {total}</h4>
                <button type="submit" onClick={handlePayNowButton} className="btn btn-danger">Pay Now</button>
            
                </center>
            </center>
        </div>
    )
} export default Bill