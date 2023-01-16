import { createContext, useReducer } from "react";

export const AppContext = createContext()

export default function ContextProvider({children}) {

    const reducer = (state, action) => {

        switch (action.type) {

            case 'login':

            return {
                ...state,
                user: {...action.payload}
            }

            case 'logout':

                return {
                    user: {},
                    posts: []
                }

            case 'getPosts':

                return {
                    ...state,
                    posts: [...action.payload]
                }

            case 'addPost':
                return {
                    ...state,
                    posts: [...state.posts, action.payload]
                }
                
            default:
            return state
        }
    }
    
    const [state, dispatch] = useReducer(reducer, {
        user: {},
        posts: []
    })

    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}