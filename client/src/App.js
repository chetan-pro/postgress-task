import React from "react";
import "./App.css";
import AddCompany from "./components/AddCompany/AddCompany";
import ListCompany from './components/ListCompany/ListCompany';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/add-company' element={<AddCompany />}></Route>
        <Route path='/company-list' element={<ListCompany />}></Route>
        <Route path='*' element={(<ListCompany />)}></Route>
      </Routes>
    </BrowserRouter>);
}

export default App;
