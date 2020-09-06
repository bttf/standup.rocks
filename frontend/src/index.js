import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './lib/apollo';
import routes, {RouteRenderer} from './routes';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          {routes.map((route, i) => (
            <RouteRenderer key={i} {...route} />
          ))}
        </div>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
