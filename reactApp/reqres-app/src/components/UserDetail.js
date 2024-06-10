import React, { useState } from 'react';
import axios from 'axios';
import './styles/UserDetail.css'

function UserDetail({ user}) {
  const [editedUser, setEditedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.patch(`https://reqres.in/api/users/${user.id}`, editedUser)
      .then(response => {
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };

  return (
    <div className='user-redact'>
      <img className='user-img' src={editedUser.avatar || 'https://vk.com/images/camera_200.png'} alt={`${editedUser.first_name}'s avatar`} />
      {isEditing ? (
        <div>
          <ul className='list-user'>
            <li className='li-regact'>
              <label>Имя:</label>
              <input className='prof-input' type="text" name="first_name" value={editedUser.first_name} onChange={handleInputChange} />
            </li>
            <li className='li-regact'>
              <label>Фамилия:</label>
              <input className='prof-input' type="text" name="last_name" value={editedUser.last_name} onChange={handleInputChange} />
            </li>
            <li className='li-regact'>
              <label>Email:</label>
              <input className='prof-input' type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
            </li>
          </ul>
          <button className='user-save' onClick={handleSave}>Сохранить</button>
        </div>
      ) : (
        <div className='user-form'>
          <h2 className='user-name'>{editedUser.first_name} {editedUser.last_name}</h2>
          <p className='user-email'>Email: {editedUser.email}</p>
          <p className='user-text'>Этот человек – веселый 25 лет, с большой любовью к приключениям и путешествиям. Его сердце бьется в ритме музыки, и он страстно увлечен игрой на гитаре. В свободное время он читает книги фэнтези и рисует фантастические пейзажи.
            Этот человек ценит дружбу и общение, он всегда готов выслушать и поддержать близких. Он активно занимается йогой и стремится к гармонии внутри себя. Его светлый и добрый настрой не оставит равнодушным никого, кто встретит его на своем жизненном пути.</p>
          <button className='user-btn' onClick={handleEdit}>Редактировать</button>
        </div>
      )}
    </div>
  );
}

export default UserDetail;