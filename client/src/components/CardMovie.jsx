const CardMovie = (props) => {
    const {title, description, genre, ...otrasProps} = props;    

  return (
    <div className='cardMovie card'>
      <div className='card-body'>
        <h3 className='card-title'>{title}</h3>
        <p className='card-subtitle'>{genre}</p>
        <p className='card-text'>{description}</p>
        {/* <a className='card-link' href="#">Ver</a> */}
      </div>
    </div>
  )
}

export {CardMovie}
