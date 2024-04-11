import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/user.actions";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formdata, setFormdata] = useState({
    email: "tony@stark.com",
    password: "password123",
    remember: false,
  });

  // Gestion de l'état d'erreur :
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Form data before sending request:', formdata);
    fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to login');
      }
    }).then(data => {
      console.log('Data received from server:', data);
      if (data) {
        dispatch(login(data.body));
        // Si l'utilisateur a coché la case "Remember me", on enregistre le token dans le localStorage :
        if (formdata.remember) {
          localStorage.setItem('token', data.body.token);
        }
        setErrorMessage("");
        navigate('/user');
      } else {
        // Gestion de l'erreur si le mot de passe ou l'email est incorrect :
        setErrorMessage("Le mot de passe ou l'email est incorrect.");
      }
    }).catch(error => {
      // Gestion de l'erreur si le serveur ne répond pas ou qu'une erreur est survenue :
      console.error(error);
      setErrorMessage("Une erreur est survenue lors de l'authentification.");
    });
  };

  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formdata.email}
          onChange={handleChange}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formdata.password}
          onChange={handleChange}
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" name="remember" checked={formdata.remember} onChange={handleChange}/>
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button" onClick={handleLogin}>Sign In</button>
      { /* Gestion de l'affichage du message d'erreur : */ }
      { errorMessage && <p className=" error-message">{errorMessage}</p> }
    </form>
  );
}

export default Form;
