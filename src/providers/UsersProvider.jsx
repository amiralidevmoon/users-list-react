import {useCallback, useReducer} from "react"
import UsersContext from "../context/UsersContext";
import usersReducer from "./../reducers/usersReducer";
import axios from "axios";
import {sweetalert} from "../helpers/helpers";

const UsersProvider = ({children}) => {

    // call reducer and take updated users state
    const [users, dispatch] = useReducer(usersReducer, []);

    // get users from endapi.io
    const getUsers = useCallback(async () => {
        try {
            const res = await axios.get("https://6288dd87abc3b5e327cc0280.endapi.io/users");
            dispatch(
                {type: "load_users", payload: res.data.data}
            );
        } catch (err) {
            console.log(err)
        }
    }, []);

    // sen user to endapi.io
    const addUser = async (user) => {
        try {
            const res = await axios.post("https://6288dd87abc3b5e327cc0280.endapi.io/users", user);

            dispatch({
                type: 'add_user', payload: res.data
            });

            sweetalert("User created successfully :)");

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <UsersContext.Provider value={{users, getUsers, addUser}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;