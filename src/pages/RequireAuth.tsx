// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import { Outlet, Navigate } from 'react-router-dom';

// import { signIn, signOut } from '@/state/slice/user';

export default function RequireAuth() {
//   const dispatch = useDispatch();
//   const user = Cookies.get('user');
//   const accessToken = Cookies.get('access_token');
//   const refreshToken = Cookies.get('refresh_token');

//   const authenticated = accessToken && refreshToken && user;

//   if (authenticated) {
//     JSON.parse(user);
//     dispatch(signIn(JSON.parse(user)));
//   } else {
//     dispatch(signOut());
//     Cookies.remove('access_token');
//     Cookies.remove('refresh_token');
//     Cookies.remove('user');
//     return <Navigate to="/auth/login" replace />;
//   } 

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
