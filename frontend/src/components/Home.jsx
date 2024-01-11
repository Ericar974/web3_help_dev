import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <main>
        <div className="bg_hp_header">
          <Link to="/allchats" className="bouton_menu">Rejoignez la liste de tchats</Link>
        </div>
        <div className="main">
          <p>Une messagerie sécurisée basée sur la technologie Web3.</p>
          <section className="instructions">
            <h2>Comment utiliser l'application :</h2>
            <div className="steps">
              {[1, 2, 3].map(number => (
                <div className="container_number_steps" key={number}>
                  <div className="numbers_steps">{number}</div>
                  <div className="numbers_content">
                    {number === 1 && "Connectez-vous de manière sécurisée."}
                    {number === 2 && "Commencez à chatter de manière confidentielle."}
                    {number === 3 && "Explorez les fonctionnalités de sécurité avancées."}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="visuals">
            <h2>Nos valeurs :</h2>
            <div className="container_values">
              {["confiance", "securite", "discretion"].map(value => (
                <div className="values" key={value}>
                  <div className={value}>
                    <div>{`La ${value}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-us">
            <h2>À propos de ChatCrypt :</h2>
            <p>Notre mission est de fournir une plateforme de messagerie sécurisée qui respecte votre vie privée.</p>
          </section>
        </div>

        <section className="testimonials">
          <h2>Ce que nos utilisateurs disent :</h2>
          <div className="testimonial">
            <p>"Une expérience de messagerie vraiment sécurisée. J'adore!"</p>
            <p>- Alice</p>
          </div>
        </section>
      </main>

      <footer className="social-media">
        <h2>Rejoignez-nous sur les réseaux sociaux :</h2>
        <div className="social-icons">
          <a href="lien-vers-votre-page-facebook"><img src="../src/assets/facebook.svg" alt="Facebook" /></a>
          <a href="lien-vers-votre-page-twitter"><img src="../src/assets/twitter.svg" alt="Twitter" /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
