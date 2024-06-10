import React from 'react';
import './styles/Search.css';

function Search({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-box">
      <input className='inputBox'
        type="text"
        placeholder="Поиск по имени или ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;