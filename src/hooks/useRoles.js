import { useState, useEffect } from 'react';
import { httpClient } from '../services/http.service';
import { VIEW_ROLES, EDIT_ROLES } from '../services/roles.service';

const useRoles = uid => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadUser(uid);
  }, [uid]);

  const loadUser = async () => {
    try {
      const { data } = await httpClient.get(`/user/${uid}`);
      if (data.roles) {
        setRoles(data.roles);
      }

      if (data.isSuperAdmin || data.isOwner) {
        setRoles([...Object.keys(VIEW_ROLES), ...Object.keys(EDIT_ROLES)]);
      }
    } catch (error) {}
  };

  const reload = () => loadUser(uid);

  return {
    roles,
    reload,
  };
};

export default useRoles;
