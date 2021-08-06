
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/protected-route";
import LoginPage from './pages/login-page';
import DashboardPage from './pages/dashboard-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.utilities.css';
import NotFoundPage from "./pages/not-found-page";
import RegistrationPage from './pages/registration-page';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        {/* <Route exact path="/test" component={DashboardPage} /> */}
        <Route exact path="/register" component={RegistrationPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
