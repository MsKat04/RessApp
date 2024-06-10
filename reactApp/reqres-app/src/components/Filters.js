import React from 'react';
import './styles/Filters.css'

function Filters({ filter, setFilter }) {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filters">
      <select className='filter' value={filter} onChange={handleFilterChange}>
        <option value="all">Все ID</option>
        <option value="odd">Нечетные ID</option>
        <option value="even">Четные ID</option>
        <option value="startsWith">Имя начинается с</option>
        <option value="doesNotStartWith">Имя не начинается с</option>
      </select>
    </div>
  );
}

export default Filters;