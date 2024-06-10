import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setProfile } from '../redux/actions';
import './styles/Registration.css'

function Registration({ setView }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://reqres.in/api/register', { email, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(setToken(token));

        const profile = { first_name, email };
        localStorage.setItem('profile', JSON.stringify(profile));
        dispatch(setProfile(profile));

        setView('list');
      })
      .catch(error => {
        console.error('Ошибка при регистрации:', error);
        setError('Ошибка при регистрации. Проверьте введенные данные.');
      });
  };

  return (
    <div className='regis-glav'>
      <h2 className='regis-title'>Регистрация</h2>
      <form className='regis-form' onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input className='regis-input' type="text" value={first_name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input className='regis-input' type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input className='regis-input' type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='regis' type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;