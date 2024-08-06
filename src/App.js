import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Watches from './pages/Watches';
import ProductDetails from './pages/Product-details';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux'
import { selectToggle} from './redux/features/sidebarSlice'
import classes from './styles/Products.module.scss'
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Order from './pages/Order';
import ProductUpload from './pages/Product-upload';
import Men from './pages/Men';
import Children from './pages/Children';
import Women from './pages/Women';
import Dashboard from './pages/admin/Dashboard';
import AllProducts from './pages/admin/AllProducts';
function App() {
  const open=useSelector(selectToggle)
  return (
    <div className="App">
        <div className={open ? classes.bg : ''}><Sidebar /></div>
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/watches" element={<Watches />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/children" element={<Children />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/:brand/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin/product-upload" element={<ProductUpload/>} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AllProducts />} />
      </Routes>
    </div>
  );
}

export default App;
