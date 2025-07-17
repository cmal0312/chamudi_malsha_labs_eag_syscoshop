import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import SupplierPage from './pages/SupplierPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Welcome</h2>}/>
        <Route path="/customer" element={<CustomerPage/>}/>
        <Route path="/supplier" element={<SupplierPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
