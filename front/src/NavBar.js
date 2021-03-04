import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Comment</Link>
        <Link to="/signin/:id">signin</Link>
        <Link to="/signup">signup</Link>
      </div>
    )
  }
}

export default Navbar;