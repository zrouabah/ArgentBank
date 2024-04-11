
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user.actions';
import { isLogged } from '../redux/actions/user.actions';

import Logo from '../assets/images/argentBankLogo.webp';

function Header() {
    // Enregistrement du token avec useSelector
    const token = useSelector(state => state.user.token);
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();

    // @TODO : Récupérer l'utilisateur si le token est présent mais que l'utilisateur n'est pas chargé. Le faire ici plutôt que sur la page User.
    useEffect(() => {
      if (token && !user.isLoaded) {
          const fetchUser = async () => {
              try {
                  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                          'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({})
                  });
                  if (response.ok) {
                      const data = await response.json();
                      dispatch(isLogged(data.body));
                  } else {
                      throw new Error('Failed to fetch user profile');
                  }
              } catch (error) {
                  console.error('Error fetching user profile:', error);
              }
          };
          fetchUser();
      }
  }, [dispatch, token, user.isLoaded]);
    return (
        <header>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to={'/'}>
                    <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    {
                        token ?
                        // Si le token est là mettre le lien de déconnexion
                        <div className='user-nav'>
                            <NavLink className="user-nav-item" to={'/user'}>
                                <p className='user-nav-name'>{user.userName}</p>
                                <i className="user-nav-icon fa fa-user-circle"></i>
                            </NavLink>

                            <NavLink className="user-nav-item" to={'/'} onClick={() => dispatch(logout())}>
                                <i className="user-nav-icon fa fa-sign-out"></i>
                                Sign out

                            </NavLink>
                        </div>
                        :
                        // Sinon laisser le Sign In
                        <NavLink className="main-nav-item" to={'/login'}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;
