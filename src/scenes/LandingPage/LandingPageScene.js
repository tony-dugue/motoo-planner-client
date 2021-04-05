import React, {useState} from 'react';
import {Link} from "react-router-dom";
import hero from "../../images/hero2.jpg";
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
                        <p className="home-presentation__text">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Alias animi dicta dolorem ea, est eveniet impedit ipsam iusto minima minus
                            molestias nesciunt nostrum porro quam quas quis similique sunt ut!</p>

                        <p className="home-presentation__text">Alias animi dicta dolorem ea, est eveniet impedit
                            ipsam iusto minima minus molestias nesciunt nostrum porro quam quas quis similique
                            sunt ut!</p>
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
                        <h2 className="home__heading">Comment créer un roadbook ?</h2>
                    </div>
                </div>

                <Presentation />

            </section>

        </div>
    );
}

