import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
    const Projects = () => {
        return (
            <span>Project</span>
        )
    }

    return (
        <Router>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/project" component={Projects} />
                <Route path="/news" render={() => <div>News</div>} />
                <Route path="/project" render={() => <div>Project</div>} />
                <Route exact path="/" render={() => <div>Home</div>} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route render={() => <div>404 not found</div>} /> {/* fallback */}
            </Switch>
        </Router>
    )
}
export default AppRoutes;
