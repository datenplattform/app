import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router';
import Navigation, {
  AkContainerTitle, AkCreateDrawer, AkGlobalItem, AkNavigationItem, AkNavigationItemGroup,
  AkSearchDrawer,
} from '@atlaskit/navigation';
import Avatar from '@atlaskit/avatar';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import PredictionsIcon from '@atlaskit/icon/glyph/bitbucket/pullrequests';
import PipelineIcon from '@atlaskit/icon/glyph/bitbucket/pipelines';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';

import CreateDrawer from '../components/CreateDrawer';
import SearchDrawer from '../components/SearchDrawer';
import HelpDropdownMenu from '../components/HelpDropdownMenu';
import AccountDropdownMenu from '../components/AccountDropdownMenu';

import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left';

import nucleusImage from '../images/nucleus.png';

export default class StarterNavigation extends React.Component {
  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };
  state = {};
  openDrawer = (openDrawer) => {
    this.setState({openDrawer});
  };

  shouldComponentUpdate(nextProps, nextContext) {
    return true;
  };

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium"/>;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="xlarge"/>;

    const searchDrawer = (
      <AkSearchDrawer
        backIcon={backIcon}
        isOpen={this.state.openDrawer === 'search'}
        key="search"
        onBackButton={() => this.openDrawer(null)}
        primaryIcon={globalPrimaryIcon}
      >
        <SearchDrawer
          onResultClicked={() => this.openDrawer(null)}
          onSearchInputRef={(ref) => {
            this.searchInputRef = ref;
          }}
        />
      </AkSearchDrawer>
    );
    const createDrawer = (
      <AkCreateDrawer
        backIcon={backIcon}
        isOpen={this.state.openDrawer === 'create'}
        key="create"
        onBackButton={() => this.openDrawer(null)}
        primaryIcon={globalPrimaryIcon}
      >
        <CreateDrawer onItemClicked={() => this.openDrawer(null)}/>
      </AkCreateDrawer>
    );
    const userMenu = (
      <AkDropdownMenu
        appearance="tall"
        items={[
          {
            heading: 'Luke Skywalker',
            items: [
              {content: 'View profile'},
              {content: 'Manage Atlassian account'},
              {content: 'Bitbucket settings'},
              {content: 'Integrations'},
              {content: 'Bitbucket labs'},
              {content: 'Log out'},
            ],
          },
        ]}
      >
        <AkGlobalItem href="">
          <Avatar size="medium" src={nucleusImage}/>
        </AkGlobalItem>
      </AkDropdownMenu>
    );

    return (
      <Navigation
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<img alt="nucleus" src={nucleusImage}/>} text="Datenplattform / Software Builder"/>
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="/"
        globalSearchIcon={<SearchIcon label="Search icon"/>}
        hasBlanket
        drawers={[searchDrawer, createDrawer]}
        globalAccountItem={AccountDropdownMenu}
        globalCreateIcon={<CreateIcon label="Create icon"/>}
        globalHelpItem={HelpDropdownMenu}
        globalSecondaryActions={[userMenu]}
        onSearchDrawerOpen={() => this.openDrawer('search')}
        onCreateDrawerOpen={() => this.openDrawer('create')}
      >
        <AkNavigationItemGroup title="Währungen">
          <Link key="/currencies" to="/currencies">
            <AkNavigationItem icon={<PipelineIcon label="Explorer" size="medium"/>} text="Explorer"
                              isSelected={this.context.router.isActive("/currencies", true)}/>
          </Link>
          <Link key="/currencies/bitcoin" to="/currencies/bitcoin">
            <AkNavigationItem icon={<PredictionsIcon label="Bitcoin" size="medium"/>} text="Bitcoin"
                              isSelected={this.context.router.isActive("/currencies/bitcoin", true)}/>
          </Link>
          <Link key="/currencies/ethereum" to="/currencies/ethereum">
            <AkNavigationItem icon={<PredictionsIcon label="Ethereum" size="medium"/>} text="Ethereum"
                              isSelected={this.context.router.isActive("/currencies/ethereum", true)}/>
          </Link>
          <Link key="/currencies/crypto-fond" to="/currencies/crypto-fond">
            <AkNavigationItem icon={<PipelineIcon label="Crypto Fond" size="medium"/>} text="Crypto Fond"
                              isSelected={this.context.router.isActive("/currencies/crypto-fond", true)}/>
          </Link>
        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Maschinelles Lernen">
          <Link key="/machine-learning" to="/machine-learning">
            <AkNavigationItem icon={<PredictionsIcon label="Maschinelles Lernen" size="medium"/>}
                              text="Maschinelles Lernen"
                              isSelected={this.context.router.isActive("/machine-learning", true)}/>
          </Link>
          <Link key="/machine-learning/model-editor" to="/machine-learning/model-editor">
            <AkNavigationItem icon={<PredictionsIcon label="Modell Editor" size="medium"/>}
                              text="Modell Editor"
                              isSelected={this.context.router.isActive("/machine-learning/model-editor", true)}/>
          </Link>
          <Link key="/machine-learning/converter" to="/machine-learning/converter">
            <AkNavigationItem icon={<PredictionsIcon label="Bildschirmfoto-Quellcode-Converter" size="medium"/>}
                              text="Bildschirmfoto-Quellcode-Converter"
                              isSelected={this.context.router.isActive("/machine-learning/model-editor", true)}/>
          </Link>
        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Maschinelles Sehen">
          <Link key="/machine-learning" to="/machine-vision">
            <AkNavigationItem icon={<PredictionsIcon label="Maschinelles Sehen" size="medium"/>}
                              text="Maschinelles Sehen"
                              isSelected={this.context.router.isActive("/machine-vision", true)}/>
          </Link>
        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Datenströme">
          <Link key="/data/videos" to="/data/videos">
            <AkNavigationItem icon={<PredictionsIcon label="Videos" size="medium"/>}
                              text="Videos"
                              isSelected={this.context.router.isActive("/data/videos", true)}/>
          </Link>
        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Quanten">
          <Link key="/quantum" to="/quantum">
            <AkNavigationItem icon={<PredictionsIcon label="Quanten" size="medium"/>}
                              text="Quanten"
                              isSelected={this.context.router.isActive("/machine-vision", true)}/>
          </Link>
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}
