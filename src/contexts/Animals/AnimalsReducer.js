import { GET_ANIMALS } from "../types";
export default (state, action) => {

    switch (action.type){

        case GET_ANIMALS: 
        return{
            ...state,
            animals : action.payload
        }

        default: 
        return state
    }
}