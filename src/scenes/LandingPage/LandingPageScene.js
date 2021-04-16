import React, {useState} from 'react';
import {Link} from "react-router-dom";
import hero from "../../assets/images/hero2.jpg";
import {Presentation} from 'components/sections/Presentation';

export function LandingPageScene() {

    const [sharelink, setSharelink] = useState("");

    const handleChange = e => setSharelink(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('ok')
    }

    return (
        <div className="content">

            <section className="home-hero">

                <div className="container">
                    <div className="row">

                        <div className="col-md-6 home-hero__link">
                            <h1 className="home-hero__link-title">Envie de planifier une balade en moto ?</h1>
                            <Link to='/register' className="btn btn-motoo-blue">Commencer la planification</Link>
                        </div>

                        <div className="col-md-6 home-hero__img">
                            <img src={hero} alt="placeholder" className="card-article__img"/>
                        </div>

                    </div>
                </div>
            </section>

            <section className="home-presentation">

                <div className="container">
                    <div className="row">

                        <p className="home-presentation__text">Motoo Planner est une application pour vous faciliter
                            la planification de road trip en moto en groupe en apportant une expérience collaborative.</p>

                        <p className="home-presentation__text">A l'aide d'une interface intuitive et simple d'utilisation,
                            vous pourrez concevoir facilement votre prochaine balade en moto et avoir à disposition
                            avant et pendant la sortie d'un roadbook regroupant les différentes étapes mais aussi
                            des informations pratiques pour tous le groupe.</p>

                    </div>
                </div>
            </section>

            <section className="home-share">
                <div className="container">
                    <div className="row">
                        <h2 className="home__heading">Vous avez reçu un lien vers un roadbook ?</h2>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit} className="home-share__form">
                            <div className="home-share__form-link">
                                <input type="password" className="form-control" name="sharelink"
                                       value={sharelink} onChange={handleChange}
                                       placeholder="Votre lien de partage" required />
                                <button type="submit" className="btn btn-motoo-outline">Voir le roadbook</button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>

            <section className="home-tutorial">

                <div className="container">
                    <div className="row">
                        <h2 className="home__heading">Etape de création</h2>
                    </div>
                </div>

                <Presentation />

            </section>

        </div>
    );
}

