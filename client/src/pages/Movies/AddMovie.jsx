import { useContext, useState} from 'react'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Button } from '../../components/Button'

const AddMovie = () => {
  const navigate = useNavigate(); //Para volver a películas
  const { auth, role } = useContext(AuthContext); //Verificamos token

  const [movie, setMovie] = useState({
      title: "",
      description: "",
      genre: [],
      platforms: [],
  })

  const [deletedGenres, setDeletedGenres] = useState ([])
  const [newGenre, setNewGenre] = useState ('') // Estado temporal para el género nuevo
  const [newPlatformName, setNewPlatformName] =useState(''); //Estado para el input de name de la nueva plataforma
  const [newPlatformUrl, setNewPlatformUrl] =useState('');  //Estado para el input de url de la nueva plataforma
  const [newPlatforms, setNewPlatforms] =useState([]);
  const [error, setError] = useState("");  // Estado para manejar errores

  const fetchMovieDetails = async () => {
      try{
         const res =  await axios.get(`http://localhost:3000/movies/${id}`, {
              headers: { 'Authorization': `Bearer ${auth}` },
            });
          // console.log("DATA: ", res.data);
          setMovie(res.data)
          // setPlatforms(movie.platforms)
          console.log('platforms', platforms)
          // console.log(movie.genre)
      } catch (err) {
          console.log(err)
      }
  }

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    //e contiene toda la información del campo. Lo desestructuramos para extraer name y value
    const { name, value } = e.target; //e.target: Es el elemento HTML que ha disparado el evento (en este caso, el input o textarea).
    //Actualizar el estado con el nuevo valor:
    setMovie((prevState) => ({
      ...prevState, //Copiamos el estado anterior
      [name]: value, //Cambiamos lo nuevo
    }));

    // console.log('Movie:', movie)
  };

const handleAdd = async (e) =>{
    e.preventDefault();
    console.log('Movie', movie)
      
    try{
        const res = await axios.post(`http://localhost:3000/movies`, movie, {
          headers: { 'Authorization': `Bearer ${auth}` },
        });
        console.log('Peli actualizada: ', res.data);
        navigate('/movies')
        // // setMovie(res.data)
      }catch (err){
        console.log(err)
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
            setError(errorMessage);      
      }
  }

  console.log(deletedGenres)

  const handleDeleteGenre = (e, genre) => {
    e.preventDefault()
    e.stopPropagation();

     // Verificar si el género ya está eliminado, si no lo está, agregarlo a removedGenres
     if (!deletedGenres.some((g) => g._id === genre._id)) {
      setDeletedGenres((prevDeletedGenres) => [...prevDeletedGenres, genre]);
    }

    setMovie((prevMovie) => ({
      ...prevMovie,
      genre: prevMovie.genre.filter((g) => g._id !== genre._id), //Obtenemos todos los géneros que no sean el que quermo eliminar
    }));
  }

  const handleChangeGenre = async (e) =>{
    setNewGenre(e.target.value); // Actualiza el estado con el valor del input
    console.log(newGenre); // Opcional: Verifica en consola el valor ingresado

  } 

  const handleAddNewGenre = async (e) => {    
    e.preventDefault();
    e.stopPropagation();

    // console.log(newGenre)
    const genreName = newGenre.trim();

    // Verificar que el género no esté vacío y que no se haya agregado previamente
    if (genreName && !movie.genre.some((g) => g.name === genreName)) {
      // Crear un objeto de género 
      const newGenreObject = { name: genreName };

      // Actualizar el estado de movie, agregando el nuevo género
      setMovie((prevMovie) => ({
        ...prevMovie,
        genre: [...prevMovie.genre, newGenreObject],
      }));

      // Limpiar el campo de entrada
      setNewGenre('');
    }
  }

  const handleChangePlatformName = async (e) =>{
    setNewPlatformName(e.target.value); // Actualiza el estado con el valor del input
    console.log(newPlatformUrl); // Opcional: Verifica en consola el valor ingresado
  } 

  const handleChangePlatformUrl = async (e) =>{
    setNewPlatformUrl(e.target.value); // Actualiza el estado con el valor del input
    console.log(newPlatformUrl); // Opcional: Verifica en consola el valor ingresado
  } 

  const handleAddNewPlatform = (e) => {
    e.preventDefault();
    console.log('Agregando')

    const newPlatformObject = {name: newPlatformName, url: newPlatformUrl}

    setMovie ((prevMovie) => ({
      ...prevMovie,
      platforms:  [...prevMovie.platforms, newPlatformObject]
    }))
    console.log(newPlatforms)
    setNewPlatformName('')
    setNewPlatformUrl('')


  }

  /* Editar plataformas */
 const handleChangePlatform = (e, index) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => {
        const updatedPlatforms = [...prevMovie.platforms];
        updatedPlatforms[index] = { ...updatedPlatforms[index], [name]: value };
        return { ...prevMovie, platforms: updatedPlatforms };
    }); 
};

  const handleEditPlatform = (e) => {
    e.preventDefault();
    console.log('Editando')
  }

  if (role !== "admin") {
    return <h2>No tienes acceso para agregar películas.</h2>;
  }

return (
  <>
   <h1>Agregar nueva película</h1>

    <form onSubmit={handleAdd}> 
        {/* Title */}
        <div>
            <Input 
              label="Título"
              type="text"
              className="form-control"
              name="title"
              value={movie.title}
              onChange={handleChange}
              />
        </div>

        {/* Description */}
        <div>
            <Textarea
              label="Descripción"
              className="form-control"
              name="description"
              value={movie.description}  
              onChange={handleChange} 
            />
        </div>

        {/* Genres */}
        <div className='mt-3'>  
        <h2 className='edit-title'>Géneros</h2>
        {movie.genre && movie.genre.length > 0 ? (
          movie.genre.map((genre, index) => {
            return (
              <div 
              className={`genre-tag d-flex flex-row mt-1`} /* Si esta dentro de los géneros eliminados, ponemos la clase removed. sino no */
              key={index}>

                <p className="d-block genre-tag-text">{genre.name}{genre._id}</p>

                {/* Botón para eliminar el género */}
                <Button onClick={(e) => handleDeleteGenre(e, genre)} className="genre-btn" label="x"/>
              </div>
            );
          })
          ) : (
          <p>No hay géneros disponibles.</p>
          )}
          
          {/* Agregar género */}
          <div className='mt-3 container-add'>
            <Input className='input-add' type="text" onChange={handleChangeGenre} name='newGenre' value={newGenre}/>
            <Button className='btn-add' onClick={(e) => handleAddNewGenre(e)} label="+"/>
            <p className='form-text text-add d-block'>Recuerda guardar luego de actualizar la lista de géneros para que los cambios impacten</p>

          </div>
        </div>
      
        {/* Platforms */}
        <div className='mt-3'>  
        <h2 className='edit-title'>Plataformas</h2>
        {/* Editar */}
        {movie.platforms && movie.platforms.length > 0 ? (
            movie.platforms.map((platform, index) => {
              return (
              <div className='platform-edit mt-3 mb-3' key={index}>
                <div className='mt-2'>
                  <Input label="Plataforma" className='form-control' type="text" name='name' onChange={(e) => handleChangePlatform(e, index)} value={platform.name}/>
                </div>

                <div className='mt-2'>
                <Input label="Link a la plataforma" className='form-control' type="text" onChange={(e) => handleChangePlatform(e, index)}  name='url' value={platform.url} />

                <p className='form-text'>Recordá revisar que el link funcione antes de colocarlo</p>
                </div>

                <Button onClick={handleEditPlatform} className='btn btn-secondary' label="Guardar"/>
              </div>
              );
            })
          ) : (
            <p>No hay plataformas disponibles.</p>
          )
        }        

        {/* Agregar nueva plataforma */}
          <div className='platform-add mt-3 mb-3'>
              <div className='mt-2'>
                <Input label="Plataforma" className='form-control' type="text" name='' onChange={handleChangePlatformName} value={newPlatformName} />
              </div>

              <div className='mt-2'>
              <Input label="Link a la plataforma" className='form-control' type="text" onChange={handleChangePlatformUrl} name='url' value={newPlatformUrl} />

              <p className='form-text'>Recordá revisar que el link funcione antes de colocarlo</p>
              </div>

              <Button  className='btn btn-secondary' onClick={handleAddNewPlatform} label="Agregar plataforma"/>
          </div>
  
        </div>
        <Button  type='submit' onClick={handleAdd} className='btn btn-primary mt-5' label="Guardar"/>
    </form>
  </>
 
)}

export  {AddMovie}





  {/* Géneros eliminados */}
          {/* Esto es algo que intenté hacer pero no logré, lo dejo para revisarlo en clase */}
          {/* {
            deletedGenres.length > 0 && (
              <div>
                {deletedGenres.map((genre) => (
                  <div key={genre._id} className='genre-tag d-flex flex-row removed'>
                    <p className='d-bock genre-tag-text'>{genre.name}</p>
                    <button
                    onClick={() => handleAddGenre(genre)}
                    className="genre-btn"
                  > + </button>
                  </div>  
                ))}
              </div>
            )
          } */}