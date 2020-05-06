// == Import : npm
import React from 'react';
import { Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './error404.scss';
import 'semantic-ui-css/semantic.min.css';


const Error404 = () => (
  <div className="error-skull">
    <Image
      className="img404"
      src="https://cdn.discordapp.com/attachments/120955568063119361/626063379454492683/error-3.png"
      centered
      disabled
    />
    <NavLink to="/">
      <h1 className="error-text">ERREUR 404, PAGE NON TROUVÉE<br />CLIQUEZ ICI POUR RETOURNER A L'ACCUEIL</h1>
    </NavLink>
  </div>
);

export default Error404;
