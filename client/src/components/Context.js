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
            
            case 'deletePost':
                return {
                    ...state,
                    posts: [...state.posts.filter(item => item._id !== action.payload)]
                }
            
                
            case 'editPost':

                const postIdx = state.posts.findIndex(item => item._id === action.payload.postId)

                const newPosts = [...state.posts]

                newPosts[postIdx].text = action.payload.text

                return {
                    ...state,
                    posts: [...newPosts]
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