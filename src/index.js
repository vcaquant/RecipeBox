// React
import React from 'react';
import { render } from 'react-dom';
// Components
import Connexion from './Components/Connexion';
import App from './Components/App';
import NotFound from './Components/NotFound';
// Rooter
import { BrowserRouter, Match, Miss } from 'react-router';
// CSS
import './index.css';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={Connexion} />
                <Match pattern="/box/:pseudo" component={App} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(
    <Root />,
    document.getElementById('root')
);
