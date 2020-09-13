import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from 'use-http';
import useLocalStorage from './useLocalStorage';
import { PROFILE_PERSISTENCE_KEY } from '../config/app.config';
import { setUserCompany } from '../store/auth.slice';

const useProfile = () => {
  const [profile, setProfile] = useLocalStorage(PROFILE_PERSISTENCE_KEY, null);
  const token = useSelector(state => state.auth.token);
  const [request, response] = useFetch('/auth/profile');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      await request.get();
      if (response.ok) {
        const profile = await response.json();
        setProfile(profile);
        dispatch(setUserCompany(profile.activeCompany));
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return profile;
};

export default useProfile;
