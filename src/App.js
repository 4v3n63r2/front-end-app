import logo from './logo.svg';
import Home from './pages/Home';
import AddEditEvent from "./pages/AddEditEvent";
import ViewEvent from "./pages/ViewEvent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEditEvent />} />
          <Route path="/edit/:id" element={<AddEditEvent />} />
          <Route path="/event/:id" element={<ViewEvent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
