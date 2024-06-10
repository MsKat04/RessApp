import React from 'react';

function UserCard({ user, onClick }) {
  return (
    <div className="user-card" onClick={() => onClick(user)}>
      <img src={user.avatar || 'https://vk.com/images/camera_200.png'} alt={`${user.first_name}'s avatar`} />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default UserCard;