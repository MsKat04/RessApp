import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setProfile } from '../redux/actions';
import './styles/Login.css'

function Login({ setView }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://reqres.in/api/login', { email, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(setToken(token));

        // Simulate fetching user profile
        const profile = { email, name: 'User' }; // Replace with actual data fetching if possible
        localStorage.setItem('profile', JSON.stringify(profile));
        dispatch(setProfile(profile));

        setView('list');
      })
      .catch(error => {
        console.error('Ошибка при входе:', error);
        setError('Ошибка при входе. Проверьте введенные данные.');
      });
  };

  return (
    <div className='exit'>
      <h2 className='exit-login'>Вход</h2>
      <form className='form-list' onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input className='email' type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input className='password' type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='btn-exit' type="submit">Войти</button>
      </form>
      <button className='regist' onClick={() => setView('register')}>Регистрация</button>
    </div>
  );
}

export default Login;