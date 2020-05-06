// == Import : npm
import React from 'react';

// == Import : local
import './about.scss';
import 'semantic-ui-css/semantic.min.css';
import {
  Card, Image, Icon, Grid,
} from 'semantic-ui-react';

// == Composant
const About = () => (
  <div className="about-card-zone">
    <Grid stackable columns={1}>
      {/* Cyril */}
      <Card.Group>
        <Card className="about-card">
          <Image
            className="about-img"
            src="https://cdn.discordapp.com/attachments/567282481003495434/626320859396702208/cyril.png"
            wrapped
            ui={false}
          />
          <Card.Content className="card-content">
            <Card.Header className="card-text">Cyril</Card.Header>
            <Card.Meta className="card-role">
              <span>Product Owner</span>
            </Card.Meta>
            <Card.Description className="card-description">
              Cyril aime Tenac
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            className="card-footer"
          >
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/cyrille-allard-053912170/"
            >
              Développeur WordPress <Icon color="blue" size="large" name="linkedin" />
            </a>
          </Card.Content>
        </Card>
        {/* Charly */}
        <Card className="about-card">
          <Image
            className="about-img"
            src="https://cdn.discordapp.com/attachments/567282481003495434/626320857983352842/Charly.png"
            wrapped
            ui={false}
          />
          <Card.Content className="card-content">
            <Card.Header className="card-text">Charly</Card.Header>
            <Card.Meta className="card-role">
              <span className="date">Tech Manager</span>
            </Card.Meta>
            <Card.Description className="card-description">
              Charly aime ious D
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            className="card-footer"
          >
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/charly-morand-1a418a90"
            >
              Développeur React js <Icon color="blue" size="large" name="linkedin" />
            </a>
          </Card.Content>
        </Card>
        {/* Lisa */}
        <Card className="about-card">
          <Image
            className="about-img"
            src="https://cdn.discordapp.com/attachments/567282481003495434/626320861015703563/lisa.png"
            wrapped
            ui={false}
          />
          <Card.Content className="card-content">
            <Card.Header className="card-text">Lisa</Card.Header>
            <Card.Meta className="card-role">
              <span className="date">Lead Front</span>
            </Card.Meta>
            <Card.Description className="card-description">
              Lisa aime Nightwish
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            className="card-footer"
          >
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/korrigane/"
            >
              Développeur React js <Icon color="blue" size="large" name="linkedin" />
            </a>
          </Card.Content>
        </Card>
        {/* kevin */}
        <Card className="about-card">
          <Image
            className="about-img"
            src="https://cdn.discordapp.com/attachments/567282481003495434/626320859740504085/kevin.png"
            wrapped
            ui={false}
          />
          <Card.Content className="card-content">
            <Card.Header className="card-text">Kevin</Card.Header>
            <Card.Meta className="card-role">
              <span className="date">Lead Back</span>
            </Card.Meta>
            <Card.Description className="card-description">
              Kevin aime Iron Maiden
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            className="card-footer"
          >
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/kevindepriester"
            >
              Développeur WordPress <Icon color="blue" size="large" name="linkedin" />
            </a>
          </Card.Content>
        </Card>
        {/* Sylvie */}
        <Card className="about-card">
          <Image
            className="about-img"
            src="https://cdn.discordapp.com/attachments/567282481003495434/626320865675575296/sylvie.png"
            wrapped
            ui={false}
          />
          <Card.Content className="card-content">
            <Card.Header className="card-text">Sylvie</Card.Header>
            <Card.Meta className="card-role">
              <span className="date">Project Manager</span>
            </Card.Meta>
            <Card.Description className="card-description">
              Sylvie aime Brassens
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            className="card-footer"
          >
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/sylvie-david-067912193/"
            >
              Développeur WordPress <Icon color="blue" size="large" name="linkedin" />
            </a>
          </Card.Content>
        </Card>
      </Card.Group>
    </Grid>
    {/* remerciement */}
    <h2
      className="about-text"
    >
      Tout l'équipe de O'Fests souhaite remercier chaleureusement les équipes de
      <a
        className="about-links"
        href="https://www.risinghorns.com/"
      > Rising Horns
      </a> et
      <a
        className="about-links"
        href="https://sueurdemetal.com/"
      > Sueur de Métal
      </a> pour leur disponibilité, soutien et encouragements
    </h2>
  </div>
);

// == Export
export default About;
