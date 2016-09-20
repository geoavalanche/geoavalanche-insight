import _ from 'lodash';
import path from 'path';
import React from 'react';
import { Link } from 'react-router';
import HtmlToReact from 'html-to-react';
import DocumentTitle from 'react-document-title';
import Classnames from 'classnames';
import { config } from 'config';
import UrlUtils from '../utils/url';
import NavUtils from '../utils/nav';
import Header from './header';
import Footer from './footer';
//import Map from './map';
//const contentMap = require('./map.js').TheApp

const NAV = require('../data/mapNav.json'),
  NAV_FLAT = NavUtils.flatten(NAV);

export default class MapTemplate extends React.Component {
  render () {
    const page = this.props.page;

    const content = this._buildContent(page.data.body, page);

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div className="page map">
          <Header activeNav="Map" />
            {content}
            //<div id="content">jhfjkhjfkhdshfjk</div>
            //<div id="map" className="map"></div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }


  _buildContent (htmlStr, page) {
    let currentPath = page.path,
      isLeaf = ('index.md' !== page.file.basename);

    /* replace all internal Anchor links to <Link /> tags  */

    let processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    let processingInstructions = [
      {
        // Custom <a> processing
        shouldProcessNode: (node) => {
          // only want anchor tags with internal links
          return _.get(node, 'name', '') === 'a'
            && 0 > _.get(node, 'attribs.href', '://').indexOf('://');
        },
        processNode: (node, children) => {
          let href = node.attribs.href;

          href = (isLeaf ? '../' : './') + href;

          let p = UrlUtils.trailingSlashIt(path.resolve(currentPath, href));

          return (
            <Link to={p}>{_.get(node, 'children.0.data')}</Link>
          );
        }
      },
      {
        shouldProcessNode: (node) => {
          return _.get(node, 'name', '') === 'code' && _.get(node, 'parent.name') === 'pre';
        },
        processNode: (node, children) => {
          node.attribs.class += ' hljs';

          return processNodeDefinitions.processDefaultNode.call(this, node, children);
        }
      },
      {
        // Anything else
        shouldProcessNode: function(node) {
          return true;
        },
        processNode: processNodeDefinitions.processDefaultNode
      }
    ];

    let htmlToReactParser = new HtmlToReact.Parser(React);

    const content = htmlToReactParser.parseWithInstructions(
      `<div>${htmlStr}</div>`, () => true, processingInstructions
    );

  }
  
}


MapTemplate.propTypes = {
  page: React.PropTypes.object,
};
