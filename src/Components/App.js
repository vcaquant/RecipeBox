import React from 'react';
// Components
import Header from './Header';
import Card from './Card';
// Recettes
import recettes from '../recettes';
// Admin
import Admin from './Admin';

class App extends React.Component {

    state = {
        recettes: {}
    };

    chargerExemple = () => {
        this.setState({ recettes })
    };

    render() {

        const cards = Object
            .keys(this.state.recettes)
            .map(key => <Card key={key} details={this.state.recettes[key]} />)

        return (
            <div className="box">
                <Header pseudo={this.props.params.pseudo} />
                <div className="cards">
                    <div className="card">
                        {cards}
                    </div>
                </div>
                <Admin chargerExemple={this.chargerExemple} />
            </div>
        )
    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    }
}

export default App;
