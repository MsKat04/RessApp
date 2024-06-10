import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setProfile, setToken } from './redux/actions';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Search from './components/Search';
import Filters from './components/Filters';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const token = useSelector(state => state.token);
  const profile = useSelector(state => state.profile);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState('list'); // list, detail, register, login, profile

  useEffect(() => { 
    axios.get(`https://reqres.in/api/users?page=${page}`)
    .then(response => 
      {dispatch(setUsers(response.data.data));})
    .catch(error => 
      { console.error('Ошибка при получении данных:', error); 

      }); 
    }, [dispatch, token, page]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedToken && savedProfile) {
      dispatch(setToken(savedToken));
      dispatch(setProfile(savedProfile));
    }
  }, [dispatch]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleUserClick = (user) => {
    if (token) {
      setSelectedUser(user);
      setView('detail');
    } else {
      setView('login');
    }
  };

  const handlePreviousPage = () => { if (page > 1) setPage(page - 1); }; 
  const handleNextPage = () => { if(page < 2 ) setPage(page + 1); else setPage(1)};

  const goBack = () => {
    setView('list');
  };
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'odd' && user.id % 2 !== 0) ||
                          (filter === 'even' && user.id % 2 === 0) ||
                          (filter === 'startsWith' && user.first_name.toLowerCase().startsWith(searchTerm.toLowerCase())) ||
                          (filter === 'doesNotStartWith' && !user.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      <header className='headApp'>
        <h1 className="app-title">Список пользователей</h1>
        {token && profile && (
          <div className='all-head'>
            <button onClick={() => handleViewChange('profile')}>Мой профиль</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('profile');
              dispatch(setToken(null));
              dispatch(setProfile({}));
              handleViewChange('list');
            }}>Выйти</button>
          </div>
        )}
        {!token && (
          <div className='headerRegist'>
            <button onClick={() => handleViewChange('login')}>Войти</button>
            <button onClick={() => handleViewChange('register')}>Регистрация</button>
          </div>
        )}
      </header>
      {view === 'list' && (
        <>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filters filter={filter} setFilter={setFilter} />
          <UserList users={filteredUsers} onUserClick={handleUserClick} />
          <div className="pagination-controls"> 
            <button onClick={handlePreviousPage}>Назад</button> 
            <button onClick={handleNextPage}>Вперед</button> 
          </div>
        </>
      )}
      {view === 'detail' && selectedUser && (
        <UserDetail user={selectedUser} setView={setView} />
      )}
      {view === 'register' && (
        <Registration setView={handleViewChange} />
      )}
      {view === 'login' && (
        <Login setView={handleViewChange} />
      )}
      {view === 'profile' && (
        <Profile profile={profile} setView={setView} />
      )}
      {view !== 'list' && <button className='last-list' onClick={goBack}>Назад</button>}
    </div>
  );
}

export default App;