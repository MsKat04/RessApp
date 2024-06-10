import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/actions';
import './styles/AllStyle.css';

function Profile() {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.patch(`https://reqres.in/api/users/${profile.id}`, editedProfile)
      .then(response => {
        setIsEditing(false);
        dispatch(setProfile(editedProfile));
      })
      .catch(error => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };

  return (
    <div className='my-prof'>
      <h2 className='prof-title'>Мой профиль</h2>
      {isEditing ? (
        <div>
          <ul className='list-redact'>
            <li className='li-regact'>
              <label>Имя:</label>
              <input className='prof-input' type="text" name="first_name" value={editedProfile.first_name} onChange={handleInputChange} />
            </li>
            <li className='li-regact'>
              <label>Фамилия:</label>
              <input className='prof-input' type="text" name="last_name" value={editedProfile.last_name} onChange={handleInputChange} />
            </li>
            <li className='li-regact'>
              <label>Email:</label>
              <input className='prof-input' type="email" name="email" value={editedProfile.email} onChange={handleInputChange} />
            </li>
            <button className='prof-save' onClick={handleSave}>Сохранить</button>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className='prof-name'>{profile.first_name} {profile.last_name}</h3>
          <p className='prof-email'>Email: {profile.email}</p>
          <button className='prof-btn' onClick={handleEdit}>Редактировать</button>
        </div>
      )}

    </div>
  );

}

export default Profile;