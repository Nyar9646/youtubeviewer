import React from 'react'
import { Link } from 'react-router-dom'

const TopPage = () => {
  <>
    <h1>This is Top Page!</h1>
    <Link to='/play/hoge'>Player page</Link>
  </>
}

export default TopPage