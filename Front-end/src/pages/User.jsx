import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { isLogged, editName } from "../redux/actions/user.actions";

import Account from "../components/Account";
import EditNameForm from "../components/EditNameForm";

function User() {
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formdata] = useState({
        id: "",
        email:"",
    });

    useEffect(() => {
        if (user.token === null) {
            return navigate('/login');
        } else {
            const handleProfile = async() => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify(formdata)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        dispatch(isLogged(data.body));
                    }
                } catch(error) {
                    console.log(error);
                }
            };

            handleProfile();
        }
    }, [dispatch, navigate, user.token, formdata]);

    const [showEditForm, setShowEditForm] = useState(false);

    const handleShowEditForm = () => {
        setShowEditForm(!showEditForm);
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        dispatch(editName(formdata));
        setShowEditForm(false);
    }

    const editModeUser = showEditForm ? "main" : "main user-bg-dark";

    return (
        <main className={editModeUser}>
            <div className="header">
                {!showEditForm && <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>}
                {!showEditForm && <button className="edit-button" onClick={handleShowEditForm}>Edit Name</button>}
                {showEditForm && 
                    <EditNameForm 
                        onSubmit={handleEditFormSubmit}
                        handleShowEditForm={handleShowEditForm}
                    />
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            
            <Account 
                title='Argent Bank Checking (x8349)'
                amount='$2,082.79'
                text='Available Balance'
                showEditForm={showEditForm}
            />

            <Account 
                title='Argent Bank Savings (x6712)'
                amount='$10,928.42'
                text='Available Balance'
                showEditForm={showEditForm}
            />

            <Account 
                title='Argent Bank Credit Card (x8349)'
                amount='$184.30'
                text='Current Balance'
                showEditForm={showEditForm}
            />            
        </main>
    );
}

export default User;
