import { GET_SHELTERS } from "../types";
export default (state, action) => {

    switch (action.type){

        case GET_SHELTERS: 
        return{
            ...state,
            shelters : action.payload
        }

        default: 
        return state
    }
}