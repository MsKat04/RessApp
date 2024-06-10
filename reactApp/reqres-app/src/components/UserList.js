import React from 'react';
import './styles/UserList.css'

function UserList({ users, onUserClick }) {
  return (
    <div className='user-list'>
      {users.map(user => (
        <div className='one-cart' key={user.id} onClick={() => onUserClick(user)}>
          <img className='img-user' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <p className='bacgraund'></p>
          <h2 className='name-user'>{user.first_name} {user.last_name}</h2>
          <p className='email-user'>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;