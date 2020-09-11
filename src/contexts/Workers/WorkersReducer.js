import { GET_WORKERS, GET_NON_WORKERS, GET_PEOPLE } from "../types";
export default (state, action) => {

    switch (action.type){

        case GET_WORKERS: 
        return{
            ...state,
            workers : action.payload
        }
        case GET_NON_WORKERS: 
        return{
            ...state,
            nonWorkers : action.payload
        }
        case GET_PEOPLE: 
        return{
            ...state,
            people : action.payload
        }

        default: 
        return state
    }
}