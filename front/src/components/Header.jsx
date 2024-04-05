import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user.actions';

import Logo from '../assets/images/argentBankLogo.webp';

function Header() {
    const token = useSelector(state => state.user.token);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    // Fonction de déconnexion
    const handleLogout = () => {
        dispatch(logout());
    };

    // Écouteur d'événement pour la navigation du navigateur
    window.onpopstate = () => {
        // Vérifiez si l'utilisateur est connecté et déconnectez-le
        if (token) {
            handleLogout();
        }
    };

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
                        <div className='user-nav'>
                            <NavLink className="user-nav-item" to={'/user'}>
                                <p className='user-nav-name'>{user.userName}</p>
                                <i className="user-nav-icon fa fa-user-circle"></i>
                            </NavLink>
                                                    
                            <NavLink className="user-nav-item" to={'/'} onClick={handleLogout}>
                                <i className="user-nav-icon fa fa-sign-out"></i>
                                Sign out
                            </NavLink>
                        </div>
                        :
                        <NavLink className="main-nav-item" to={'/login'}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    }
                </div>   
            </nav>
        </header>
    );
}

export default Header;
