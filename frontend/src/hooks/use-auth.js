import { useSelector } from "react-redux";

const useAuth = () => {
    const { login, token, id } = useSelector((state) => state.user);

    return {
        isAuth: !!login,
        login,
        token,
        id,
    };
};

export default useAuth;
