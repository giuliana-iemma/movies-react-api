  import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, Movies, FormLogin, FormRegister, DeleteMovie, ViewMovie, EditMovie, AddMovie } from './pages'
import {Navbar} from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
      <Navbar/>

     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/users/login" element={<FormLogin/>} />
      <Route path="/users/register" element={<FormRegister/>} /> {/* Registro */}
      <Route path="/movies/:id" element={<ViewMovie/>} />
      <Route path="/movies/:id/edit" element={<EditMovie/>} />
      <Route path="/movies/add" element={<AddMovie/>} />
    </Routes>
    </>
  )
}

export default App
