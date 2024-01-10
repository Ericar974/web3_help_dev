import React from 'react';

const Home = () => {
  return (
<div className="homepage">
  <header>
    <h1>ChatCrypt</h1>
    <p>Une messagerie sécurisée basée sur la technologie Web3.</p>
  </header>
  <main>
    <div className='bg_hp_header'> </div>
    <div className="main">
      <section className="instructions">
        <h2>Comment utiliser l'application :</h2>
        <div className="steps">
          <div className="container_number_steps">
            <div className="numbers_steps">1</div>
            <div className="numbers_content">Connectez-vous de maniére sécurisée.</div>
          </div>
          <div className="container_number_steps">
            <div className="numbers_steps">2</div>
          <div className="numbers_content">Commencez à chatter de manière confidentielle.</div>
          </div>
          <div className="container_number_steps">
            <div className="numbers_steps">3</div>
          <div className="numbers_content">Explorez les fonctionnalités de sécurité avancées.</div>
          </div>
        </div>
      </section>

      <section className="visuals">
      <h2>Nos valeurs :</h2>
      <div className="container_values">
        <div className='values'>
          <div className="confiance">
            <div>La confiance</div>
          </div>
        </div>
        <div className='values'>
          <div className="securite">
            <div>La sécurité</div>
          </div>
        </div>
        <div className='values'>
          <div className="discretion">
            <div>La discrétion</div>
          </div>
        </div>
      </div>
    </section>


    <section className="testimonials">
      <h2>Ce que nos utilisateurs disent :</h2>
      <div className="testimonial">
        <p>"Une expérience de messagerie vraiment sécurisée. J'adore!"</p>
        <p>- Alice</p>
      </div>
    </section>

    <section className="web3-presentation">
      <h2>Explorez le Web3 avec ChatCrypt :</h2>
      <p>Découvrez comment nous utilisons la technologie Web3 pour garantir la confidentialité de vos messages.</p>
    </section>

    <section className="about-us">
      <h2>À propos de ChatCrypt :</h2>
      <p>Notre mission est de fournir une plateforme de messagerie sécurisée qui respecte votre vie privée.</p>
    </section>
    </div>
  </main>
    <footer className="social-media">
      <h2>Rejoignez-nous sur les réseaux sociaux :</h2>
      <div className="social-icons">
        <a href="lien-vers-votre-page-facebook"><img src="icone-facebook.png" alt="Facebook" /></a>
        <a href="lien-vers-votre-page-twitter"><img src="icone-twitter.png" alt="Twitter" /></a>
      </div>
    </footer>
  </div>
  );
};

export default Home;