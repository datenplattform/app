import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import PageSubtitle from '../components/PageSubtitle';
import ContentWrapper from '../components/ContentWrapper';

export default class CurrencyExplorerPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
    };
  }

  render() {
    const {isLoading, error} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <ContentWrapper>
        <PageTitle>Cryptowährungs-Explorer</PageTitle>
        <PageSubtitle>Empfehlungen</PageSubtitle>
        <PageSubtitle>Newcomer</PageSubtitle>
      </ContentWrapper>
    );
  }
}