import { useNavigate } from '@reach/router';
import {
  JWT_PERSISTENCE_KEY,
  PROFILE_PERSISTENCE_KEY,
} from '../config/app.config';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/auth.slice';

const useAuth = (loginRoute = '/') => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (redirect = true) => {
    dispatch(setToken(null));
    localStorage.removeItem(JWT_PERSISTENCE_KEY);
    localStorage.removeItem(PROFILE_PERSISTENCE_KEY);
    navigate(loginRoute);
  };

  return { logout, isLogged: !!auth.token };
};

export default useAuth;
