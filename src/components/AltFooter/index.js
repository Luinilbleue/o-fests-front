// == Import : npm
import React from 'react';
import {
  Container, Image, Menu, Icon,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './altFooter.scss';

// == Composant
const AltFooter = () => (
  <Menu
    as="footer"
    inverted
    borderless
    className="footer-menu"
    fluid
    widths={7}
  >
    <Container>
      <Menu.Item
        as={NavLink}
        to="/about"
        className="footer-item"
      >
        A propos
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/contact"
        className="footer-item"
      >
        Nous contacter
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/legal"
        className="footer-item"
      >
        Mentions Légales
      </Menu.Item>
      <Menu.Item className="footer-item">
        <Image
          className="footer-img"
          size="tiny"
          src="https://cdn.discordapp.com/attachments/120955568063119361/624888686580072475/unnamed.png"
        />
      </Menu.Item>
      <Menu.Item
        as="a"
        href="https://www.facebook.com/OFests-101445824584383/"
        className="footer-icon"
      >
        <Icon
          name="facebook square"
          size="large"
          color="orange"
          inverted
        />
      </Menu.Item>
      <Menu.Item
        as="a"
        href="https://twitter.com/OfestsP"
        className="footer-icon"
      >
        <Icon
          name="twitter square"
          size="large"
          color="orange"
          inverted
        />
      </Menu.Item>
      <Menu.Item
        as="a"
        href="https://instagram.com"
        className="footer-icon"
      >
        <Icon
          name="instagram"
          size="large"
          color="orange"
          inverted
        />
      </Menu.Item>
    </Container>
  </Menu>
);

export default AltFooter;
