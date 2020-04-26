import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import styled from 'styled-components';
import routes, {RouteRenderer} from './routes';
import AppTopNav from './components/AppTopNav';
import {LOCAL_STORAGE_CAPCAL_TOKEN_PATH} from './constants';

const AppContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  max-width: 900px;

  margin: 0 auto;
`;

const ContentContainer = styled('div')`
  margin-top: 32px;
  width: 100%;
  min-height: 360px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

class App extends React.Component {
  render() {
    const isAuthenticated = !!window.localStorage.getItem(
      LOCAL_STORAGE_CAPCAL_TOKEN_PATH,
    );

    return (
      <BrowserRouter>
        <AppContainer>
          {isAuthenticated && <AppTopNav />}

          <ContentContainer>
            {routes.map((route, i) => (
              <RouteRenderer key={i} {...route} />
            ))}
          </ContentContainer>
        </AppContainer>
      </BrowserRouter>
    );
  }
}

export default App;
