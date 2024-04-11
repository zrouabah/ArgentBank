import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';

/* ce code configure et crée un magasin Redux pour application, 
et associe un réducteur spécifique (userReducer) à ce magasin 
pour gérer les changements d'état liés à l'utilisateur*/
const store = configureStore({ reducer: {
    user: userReducer,
},})

export default store;
