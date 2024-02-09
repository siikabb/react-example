/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <p>log out!!!</p>;
};

export default Logout;
