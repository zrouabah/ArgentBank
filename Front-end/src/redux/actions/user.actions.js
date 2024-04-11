export const login = (payload) => {
    return {
        type: 'LOGIN',
        payload,
    }
}

// signalé que l'utilisateur est authentifié
export const isLogged = (payload) => {
    return {
      type: 'IS_LOGGED',
      payload,
    }
}

// signaler que le nom d'utilisateur a été modifié avec succès
export const editName = (payload) => {
    return {
        type: 'EDIT_NAME',
        payload,
    }
}
// signaler que l'utilisateur s'est déconnecté
export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}
