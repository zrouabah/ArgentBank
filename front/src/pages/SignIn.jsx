import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";

function SignIn() {
  const navigate = useNavigate();
  const isLogged = useSelector(state => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, []);

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <Form />
            </section>
        </main>
    )
}

export default SignIn;
