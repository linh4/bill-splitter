import React from 'react';
import { Link } from 'react-router-dom'

const HomePage = (props) => {
  return (
    <div>
      <Link to="/bills/upload">
      <h1>Home - New Bill</h1>
    </Link>

    <Link to="/bills">
      <h1>Home - My Bills</h1>
    </Link>
    </div>
  )
}

export default HomePage;
