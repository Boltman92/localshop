import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <nav className="mt-10 text-center flex-wrap bg-blue-700 p-6">
        <Link className="text-center text-white" to="/logs">
          Logs
        </Link>
      </nav>
    )
}

Footer.propTypes = {}

export default React.memo(Footer)