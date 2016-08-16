import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Headroom from 'react-headroom';
import { config } from 'config';
import Classnames from 'classnames';



const NAV = [
  {
    label: 'Get started',
    title: 'Get started',
    link: prefixLink(config.gettingStartedLink),
    tag: 'get_started',
  },
  {
    label: 'Docs',
    title: 'Documentation',
    link: prefixLink(config.docsLink),
    tag: 'docs',
  },
  {
    label: <i className="twitter" />,
    title: 'Twitter',
    link: config.twitterUrl,
    tag: 'twitter',
    type: 'social',
  },
  {
    label: <i className="github" />,
    title: 'Github',
    link: config.githubUrl,
    tag: 'github',
    type: 'social',
  },
  {
    label: <i className="discuss" />,
    title: 'Discuss',
    link: config.discussUrl,
    tag: 'discuss',
    type: 'social',
  },
];


export default class Header extends React.Component {
  render () {
    const activeNav = this.props.activeNav;

    let header = null;

    if (this.props.show) {
      const navItems = NAV.map((item) => (
        <li key={item.tag} className={Classnames(item.type)}>
          <Link 
            title={item.title}
            to={item.link} 
            className={Classnames({active: activeNav === item.tag})}>
              {item.label}
          </Link>
        </li>
      ));

      header = (
        <header>
          <section className="brand">
            <Link to={prefixLink('/')}>
              Waigo.js
            </Link>
          </section>
          <ul className="nav">
            {navItems}
          </ul>
        </header>
      );
    }

    return (
      <Headroom>
        {header}
      </Headroom>
    );
  }
}


Header.propTypes = {
  activeNav: React.PropTypes.string,
  show: React.PropTypes.bool,
};

Header.defaultProps = {
  activeNav: null,
  show: true,
};




