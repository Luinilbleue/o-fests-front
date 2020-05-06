// == Import : npm
import React from 'react';

// == Import : local
import './legalMentions.scss';
import 'semantic-ui-css/semantic.min.css';


const LegalMentions = () => (

  <div className="legal">
    <em className="important-notice">
        Merci de lire attentivement les présentes modalités d'utilisation du présent site avant de le parcourir.<br />
        En vous connectant sur ce site, vous acceptez sans réserve les présentes modalités.
    </em>
    <h2 className="legal-title">Editeur du site</h2>
    <p>
      Site Internet Qualité<br />
      par O-Fests<br />
      49 boulevard Kirk Hammett<br />
      SFO
    </p>

    <p>
      O-Fests est une EURL au capital de 6,66€<br />
      RCS B 123 456 789 - Siret : en cas de pluie - APE : 666MET<br />
      N° déclaration CNIL : 987654321
    </p>

    <h2 className="legal-title">Conditions d'utilisation</h2>
    <p>
      Le site accessible par les url suivants : www.ofests.eu est exploité dans le respect de la législation française.<br />
      L'utilisation de ce site est régie par les présentes conditions générales.<br />
      En utilisant le site, vous reconnaissez avoir pris connaissance de ces conditions et les avoir acceptées.<br />
      Celles-ci pourront êtres modifiées à tout moment et sans préavis par la société Ofests.<br />
      Ofests net ne saurait être tenu pour responsable en aucune manière d’une mauvaise utilisation du service.
    </p>
    <h2 className="legal-title">Responsable éditorial</h2>
    <p>
      Joe Satriani
    </p>

    <h2 className="legal-title">Limitation de responsabilité</h2>
    <p>
      C'est quand même monstrueuseusement ennuyeux ces mentions légales.<br />
      C'est dingue qu'il y ait des gens dont c'est le boulot de lire et rédiger ça.
    </p>

  </div>
);

// == Export
export default LegalMentions;
