import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import RentalsForm from "./components/rentalsForms"
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import CustomersForm from "./components/customersForm"
import "./App.css";
import { useParams, useNavigate } from "react-router-dom";

// Componente funcional que envolve o MovieForm
function MovieFormWrapper() {
  // useParams permite acessar os parâmetros da rota atual
  const params = useParams();

  // useNavigate retorna uma função para navegar programaticamente
  const navigate = useNavigate();

  // Retorna o componente MovieForm, passando os parâmetros da rota e a função de navegação como props
  return <MovieForm params={params} navigate={navigate} />;
}


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieFormWrapper />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CustomersForm />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals/new" element={<RentalsForm />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
