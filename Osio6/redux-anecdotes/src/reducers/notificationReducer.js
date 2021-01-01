const initialState = ''

export const createNotification = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        data: message
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data

        case 'REMOVE_NOTIFICATION':
            return ''

        default:
            return state
    }

}

export default reducer 