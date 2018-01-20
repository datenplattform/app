import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import PageSubtitle from '../components/PageSubtitle';
import ContentWrapper from '../components/ContentWrapper';
import {Line} from 'react-chartjs-2';

export default class CurrencyPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCurrency(this.props.routeParams.currency);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  fetchCurrency(currency) {
    this.setState({isLoading: true});

    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch('http://localhost:5000/api/rest/currencies/' + currency + '.json', options)
      .then(response => response.json())
      .then(data => this.setState({data: data, isLoading: false}))
      .catch(error => this.setState({error, isLoading: false}));
  }

  render() {
    const {data, isLoading, error} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    let labels = data.map(item => {
      return item.Date;
    });
    let open = data.map(item => {
      return item.Open;
    });
    let close = data.map(item => {
      return item.Close;
    });
    let volatility = data.map(item => {
      return item.Volatility;
    });

    const config = {
      labels: labels,
      datasets: [
        {
          label: 'Open',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          data: open
        },
        {
          label: 'Close',
          fill: false,
          borderColor: 'rgba(25,92,92,1)',
          data: close
        }
      ]
    };

    let currency = this.props.routeParams.currency;

    return (
      <ContentWrapper>
        <PageTitle>{currency.charAt(0).toUpperCase() + currency.slice(1)}</PageTitle>
        <PageSubtitle>Aktueller Kurs</PageSubtitle>
        <Line data={config}/>
        <PageSubtitle>Vorhersage</PageSubtitle>
        <Line
          data={{label: labels, datasets: [{label: 'Volatility', data: volatility, fill: true, lineTension: 0.5}]}}/>
      </ContentWrapper>
    );
  }
}