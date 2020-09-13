import { useProfile } from './';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompany as setAdminCompany } from '../store/auth.slice';

// const MOCK_COMPANY = 'c8bfce94-cfc6-48f7-b619-3a6477dd04d7';

const useActiveCompany = () => {
  const dispatch = useDispatch();
  const adminCompany = useSelector(state => state.auth.adminCompany);
  const company = useSelector(state => state.auth.company);
  const [companyName, setCompanyName] = useState(null);

  const setAdminCompanyAction = (adminCompany, name) => {
    dispatch(setAdminCompany({ company: adminCompany, name }));
  };

  return {
    company: adminCompany ? adminCompany : company,
    setCompany: setAdminCompanyAction,
    companyName,
    setCompanyName,
  };
};

export default useActiveCompany;
