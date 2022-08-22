const defaultState = {
    user: {}
}

export default function reducer(state = defaultState, { type, payload }) {
 // work with state
 switch(type) {
     case 'SET_USER_STATE':
         return {
             ...state,
             user:{
                username: payload
             } 
         }
 }
 return state;
}