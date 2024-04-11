// On initialise le state de notre reducer en allant chercher le token dans le localStorage. Si le token est présent, on initialise isLogged à true, sinon à false.
const initialState = {
    token: localStorage.getItem('token'),
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    isLogged: !!localStorage.getItem('token'),
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload, isLogged: true }
        case 'IS_LOGGED':
            return { ...state, ...action.payload };
        case'EDIT_NAME':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            // Return le state initial et met le token à null et isLogged à false:
            return { ...initialState, token: null, isLogged: false }
        default:
            return state
    }
}

export default userReducer;