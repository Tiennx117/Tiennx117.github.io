import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BehaviorsContext } from 'shared/services';
import { DemoMainComponent } from './DemoMainComponent';
import { Context, DemoControlService } from './DemoControlService';

class DemoControlModule extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    }
    render() {
        return (
            <BehaviorsContext.Consumer>
                {({ beh }) => (
                    <Context.Provider value={{
                        demoService: new DemoControlService(),
                        beh: beh
                    }}>
                        <Switch>
                            <Route path={this.props.match.path} render={(props) => <DemoMainComponent {...props} />} />
                        </Switch>
                    </Context.Provider>
                )}
            </BehaviorsContext.Consumer >
        );
    }
}

export { DemoControlModule };