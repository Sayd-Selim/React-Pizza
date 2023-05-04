import React from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import {Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";


export const SearchContext = React.createContext(); // Здесь мы создаем контекст

function App() {
  const [searchInput, setSearchInput] = React.useState("");



  return (
    <div className="wrapper">
      
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
