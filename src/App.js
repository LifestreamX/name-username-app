import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUsername, deleteUser } from './features/Users';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from 'react-icons/md';
import DarkMode from './DarkMode';


function App() {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [editUser, setEditUser] = useState('');

  const [theme, setTheme] = useState('light');

  // Setting Focus on page load

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const inputRef = useRef();

  // Logic to edit user
  const handleEditUsername = (e) => {
    setEditUser(e.target.value);
  };

  // Logic to add a user
  const handleUserChange = (e) => {
    setNewUser(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  // Dark mode
  const toggleTheme = () => {
    setTheme((cur) => (cur === 'light' ? 'dark' : 'light'));
  };

  return (
    <main className='App' id={theme} value={{ theme, toggleTheme }}>
      {/* Add user inputs */}
      <section className='top-section'>
        <input
          type='text'
          placeholder='Name...'
          onChange={handleUserChange}
          value={newUser}
          autoComplete='off'
          ref={inputRef}
        />
        <input
          type='text'
          placeholder='Username...'
          value={newUsername}
          onChange={handleUsernameChange}
          autoComplete='off'
        />
        <button
          className='top-section-button'
          onClick={() => {
            dispatch(
              addUser({
                id: uuidv4(),
                name: newUser,
                username: newUsername,
              })
            );
            setNewUser('');
            setNewUsername('');
          }}
          disabled={
            !newUser ||
            !newUsername ||
            newUser === newUsername ||
            (newUser && newUsername.length > 20)
          }
        >
          Add User
        </button>
        <div className='dark-mode-wrapper'>
          <DarkMode toggleTheme={toggleTheme} theme={theme} />
        </div>
      </section>

      {/* Bottom section*/}
      <section className='bottom-section'>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              <MdDeleteForever
                className='delete-button'
                onClick={() => {
                  dispatch(
                    deleteUser({
                      id: user.id,
                    })
                  );
                }}
              />
              <div className='name-username'>
                <h1 className='name'>{user.name}</h1>
                <h2 className='username'> {user.username}</h2>
              </div>
              <div className='user-card-info-input-button'>
                <input
                  type='text'
                  placeholder='New Username...'
                  onChange={handleEditUsername}
                />
                <button
                  className='update-button'
                  onClick={() => {
                    dispatch(
                      updateUsername({
                        id: user.id,
                        username: editUser,
                      })
                    );
                  }}
                >
                  Update Username
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
