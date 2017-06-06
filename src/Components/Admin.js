import React from 'react';
import AjouterRecette from './AjouterRecette';
import Base from '../Base';

class Admin extends React.Component {

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        Base.onAuth(user => {
            if (user) {
                this.traiterConnexion(null, {user});
            }
        })
    }

    traiterChangement = (event, key) => {
        const recette = this.props.recettes[key];
        const majRecette = {
            ...recette,
            [event.target.name]: event.target.value
        };
        this.props.majRecette(key, majRecette);
    };

    traiterConnexion = (err, authData) => {

        if (err) {
            console.log(err);
            return;
        }

        const boxRef = Base.database().ref(this.props.pseudo);

        boxRef.once('value', snapchot => {

            const data = snapchot.val() || {};

            if (!data.owner) {
                boxRef.set({
					owner: authData.user.uid
				})
            }

            this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
        });
    };

    connexion = provider => {
        Base.authWithOAuthPopup(provider, this.traiterConnexion);
    };

    deconnexion = () => {
        Base.unauth();
        this.setState({ uid: null });
    };

    renderLogin = () => {
        return (
            <div className="login">
                <h2>Connectes toi pour créer tes recettes</h2>
                <button
                    className="facebook-button"
                    onClick={() => this.connexion('facebook')} >
                    Me connecter avec Facebook
                </button>
                <button
                    className="twitter-button"
                    onClick={() => this.connexion('twitter')} >
                    Me connecter avec Twitter
                </button>
            </div>
        )
    };

    renderAdmin = key => {
        const recette = this.props.recettes[key];
        return (
            <div className="card" key={key} >
                <form className="admin-form">

                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom de la recette"
                        onChange={e => this.traiterChangement(e, key)}
                        value={recette.nom} />

                    <input
                        type="text"
                        name="image"
                        placeholder="Adresse de l'image"
                        onChange={e => this.traiterChangement(e, key)}
                        value={recette.image} />

                    <textarea
                        name="ingredients"
                        rows="3"
                        placeholder="Liste des ingrédients"
                        onChange={e => this.traiterChangement(e, key)}
                        value={recette.ingredients} >
                    </textarea>

                    <textarea
                        name="instructions"
                        rows="15"
                        placeholder="Liste des instructions"
                        onChange={e => this.traiterChangement(e, key)}
                        value={recette.instructions} >
                    </textarea>
                </form>

                <button onClick={() => this.props.supprimerRecette(key)} >Supprimer</button>
            </div>
        )
    }

    render() {

        const deconnexion = <button onClick={this.deconnexion}>Déconnexion</button>

        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div className="login">
                    {this.renderLogin()}
                    <p>Vous n'êtes pas le propriétaire de cette boîte à recette.</p>
                </div>
            )
        }

        const adminCards = Object
            .keys(this.props.recettes)
            .map(this.renderAdmin);

        return (
            <div className="cards">
                <AjouterRecette ajouterRecette={this.props.ajouterRecette} />
                {adminCards}
                <footer>
                    <button onClick={this.props.chargerExemple}>Remplir</button>
                    {deconnexion}
                </footer>
            </div>
        )
    }

    static propTypes = {
        pseudo: React.PropTypes.string.isRequired,
        recettes: React.PropTypes.object.isRequired,
        chargerExemple: React.PropTypes.func.isRequired,
        ajouterRecette: React.PropTypes.func.isRequired,
        majRecette: React.PropTypes.func.isRequired,
        supprimerRecette: React.PropTypes.func.isRequired
    }
}

export default Admin;
