import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router';
import Navigation, {
  AkGlobalItem, AkContainerTitle, AkCreateDrawer, AkNavigationItem, AkNavigationItemGroup,
  AkSearchDrawer,
} from '@atlaskit/navigation';
import Avatar from '@atlaskit/avatar';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import PredictionsIcon from '@atlaskit/icon/glyph/bitbucket/pullrequests';
import GearIcon from '@atlaskit/icon/glyph/settings';
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
  state = {
    navLinks: [
      ['/', 'Startseite', DashboardIcon],
      ['/settings', 'Einstellungen', GearIcon],
    ]
  };
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
              { content: 'View profile' },
              { content: 'Manage Atlassian account' },
              { content: 'Bitbucket settings' },
              { content: 'Integrations' },
              { content: 'Bitbucket labs' },
              { content: 'Log out' },
            ],
          },
        ]}
      >
        <AkGlobalItem href="">
          <Avatar size="medium" src={nucleusImage} />
        </AkGlobalItem>
      </AkDropdownMenu>
    );

    return (
      <Navigation
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<img alt="nucleus" src={nucleusImage}/>} text="Datenplattform"/>
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
        <AkNavigationItemGroup title="default">
          {
            this.state.navLinks.map(link => {
              const [url, title, Icon] = link;
              return (
                <Link key={url} to={url}>
                  <AkNavigationItem
                    icon={<Icon label={title} size="medium"/>}
                    text={title}
                    isSelected={this.context.router.isActive(url, true)}
                  />
                </Link>
              );
            }, this)
          }
        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Währungen">
          <Link key="/currencies/bitcoin" to="/currencies/bitcoin">
            <AkNavigationItem icon={<PredictionsIcon label="Bitcoin" size="medium"/>} text="Bitcoin"
                              isSelected={this.context.router.isActive("/currencies/bitcoin", true)}/>
          </Link>
          <Link key="/currencies/ethereum" to="/currencies/ethereum">
            <AkNavigationItem icon={<PredictionsIcon label="Ethereum" size="medium"/>} text="Ethereum"
                              isSelected={this.context.router.isActive("/currencies/ethereum", true)}/>
          </Link>
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}
