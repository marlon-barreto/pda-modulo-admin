import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import { useAuth } from '../../hooks/Auth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const auth = useAuth();

  useEffect(() => {
    const param = query.get('p_param');
    // if (!auth.user) {
    if (!param) {
      history.push('/505');
    } else {
      const params = param?.split('|');
      if (params.length === 2) {
        auth
          .signIn({ module: params[1], user: params[0] })
          .then(response => {
            if (!response.name && response.active) {
              history.push('/505');
            } else {
              history.push('/Dashboard');
            }
          })
          .catch(err => {
            // console.log('ERROR');
            // console.log(err);
            history.push('/505');
          });
      }
    }
    // }
  }, [auth, history, query]);

  return <LoadingComponent />;
};

export default SignIn;
