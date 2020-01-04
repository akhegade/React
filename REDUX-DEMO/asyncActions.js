//import...
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
//...imports
const inittalState = {
    loading: false,
    users: [],
    error: ""
};

const FETCH_UESRS_REQUEST = "FETCH_UESRS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_UESRS_FAILURE = "FETCH_UESRS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_UESRS_REQUEST
    };
};
const fetchUsersSuccess = () => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
};

const fetchUsersFailure = () => {
    return {
        type: FETCH_UESRS_FAILURE,
        playload: error
    };
};

const reducer = (state = inittalState, action) => {
    switch (action.type) {
        case FETCH_UESRS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                    error: ""
            };
        case fetchUsersFailure:
            return {
                ...state,
                users: [],
                    error: action.payload
            };
        default:
            return state
    }
};

const fetchUsers = () => {
    return function (dispacth) {
        dispacth(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.users
                dispacth(fetchUsersSuccess(users))
            }).catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }

}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    Console.log(store.getState())
})
store.dispatch(fetchUsers)