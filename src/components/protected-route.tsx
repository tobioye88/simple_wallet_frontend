import { Route, useHistory } from 'react-router-dom';
import { DashboardLayout } from './dashboard-layout';

export const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const history = useHistory();

    const isValidToken = (token: string): boolean => {
      try{
        JSON.parse(atob(token.split('.')[1]));
        return true;
      } catch(e){
        console.log(e);
        return false;
      }
    };

    const token = localStorage.getItem('token');
    if(!token || !isValidToken(token)){
      history.push('/');
    }
    
    return (
      <Route
        {...rest}
        render={(props) => {
          return (
            <DashboardLayout>
              <Component {...props} />
            </DashboardLayout>
          )
        }}
      />
    )
  }
  