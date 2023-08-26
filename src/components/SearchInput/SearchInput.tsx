import React from 'react'

export const SearchInput = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="input"
        placeholder="Search for breeds by name"
      ></input>

      <div className="search-icon"></div>
    </div>
  )
}
