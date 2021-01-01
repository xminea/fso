const initialState = ''

export const createFilter = (message) => {
    return {
        type: 'SET_FILTER',
        data: message
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data

        default:
            return state
    }
}

export default reducer 