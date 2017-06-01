import React from 'react';
// Components
import Header from './Header';
import Card from './Card';
// Recettes
import recettes from '../recettes';
// Admin
import Admin from './Admin';
// Database
import Base from '../Base';

class App extends React.Component {

    state = {
        recettes: {}
    };

    componentWillMount() {
        this.ref = Base.syncState( `${this.props.params.pseudo}/recettes`, {
            context: this,
            state: 'recettes'
        } )
    }

    componentWillUnMount() {
        Base.removeBinding(this.ref);
    }

    chargerExemple = () => {
        this.setState({ recettes })
    };

    ajouterRecette = recette => {
        const recettes = {...this.state.recettes};
        const timestamp = Date.now();
        recettes[ `recette-${timestamp}` ] = recette;
        this.setState({ recettes });
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
                <Admin
                    chargerExemple={this.chargerExemple}
                    ajouterRecette={this.ajouterRecette} />
            </div>
        )
    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    }
}

export default App;
