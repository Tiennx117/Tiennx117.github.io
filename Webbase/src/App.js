
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoadingComponent, RouteGuardComponent as RouteGuard,AlertComponent,ConfirmComponent} from 'shared/components';

import { MainLayout } from './layouts/MainLayout';
import OauthCallback from './modules/oauth-callback/OauthCallback';
import { LoginComponent } from './modules/login';
import { LogoutComponent } from './modules/logout';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<LoadingComponent loading={true} />} persistor={persistor}>
                    <Router>
                        <Switch>
                            <Route path="/oauth-callback" component={OauthCallback} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/logout" component={LogoutComponent} />
                            {/* route này sẽ thay bằng Private Router */}
                            <Route path="/" component={MainLayout} />

                        </Switch>
                    </Router>
                    <AlertComponent/>
                    <ConfirmComponent/>
                </PersistGate>
            </Provider>
        );
    }
}
export default App;