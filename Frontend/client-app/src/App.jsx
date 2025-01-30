
import './App.css'
import CustomerMain from './customerviews/CustomerMain'
import CustomerReg from './customerviews/CustomerReg'
import AddProduct from './productsviews/AddProduct'
import DeleteProductCatg from './productsviews/DeleteProductCatg'
import MyCart from './productsviews/MyCart'
import ProductList from './productsviews/ProductList'
import SaveProductCatg from './productsviews/SaveProductCatg'
import SearchProductCatg from './productsviews/SearchProductCatg'
import ShowProduct from './productsviews/ShowProduct'
import ShowProductCatg from './productsviews/ShowProductcatg'
import UpdateProductCatg from './productsviews/UpdateProductCatg'
import DeleteCity from './statecityviews/DeleteCity'
import SaveCity from './statecityviews/SaveCity'
import SaveState from "./statecityviews/SaveState"
import SearchCity from './statecityviews/SearchCity'
import ShowCity from './statecityviews/ShowCity'
import UpdateCity from './statecityviews/UpdateCity'
import UpdateState from './statecityviews/UpdateState'
import { BrowserRouter } from 'react-router-dom'
import VendorReg from './vendorviews/VendorReg'
import VendorLogin from './vendorviews/VendorLogin'
import VendorMain from './vendorviews/VendorMain'

function App() {

  return (
    <>
    <BrowserRouter>
    <CustomerMain/>
    </BrowserRouter>
    </>
  )
}

export default App
