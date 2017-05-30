import React from 'react';

class NotFound extends React.Component {

    goToConnexion = event => {
        event.preventDefault();
        this.context.router.transitionTo('/');
    };

    render() {
        return (
                <form className="notFound" onClick={e => this.goToConnexion(e)} >
                        <button type="button">Try Again Here</button>
                </form>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default NotFound;
