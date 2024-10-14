import {  useParams } from "react-router-dom";
import LoginComponent from "./login";
import SignupComponent from "./signup";
const AuthComponent = () => {
    const { type } = useParams();
    return (
        <>
            {type === "login" ? (
                <LoginComponent/>
            ) : (
                <SignupComponent/>
            )}
        </>
    );
}

export default AuthComponent;