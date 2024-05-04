import "font-awesome/css/font-awesome.min.css"
import 'animate.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './components/homepage'
import Products from './components/products'
import Faculty from './components/faculty'
import ContactUs from './components/contact-us'
import Login from './components/login'
import NotFound from './components/not-found'
import Hello from './components/hello'
import Test from './components/test'

const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;