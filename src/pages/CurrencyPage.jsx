import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import PageSubtitle from '../components/PageSubtitle';
import ContentWrapper from '../components/ContentWrapper';
import {Line} from 'react-chartjs-2';

export default class CurrencyPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      values: [],
      predictionKeys: [],
      predictionValues: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
//    this.fetchCurrency(this.props.routeParams.currency);

    let url = (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.hostname + ':3333';
    let socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("connected.");
    };
    socket.onerror = error => {
      console.error(error);
    };
    socket.onmessage = message => {
      let data = message.data;
      try {
        data = JSON.parse(data);

        if (data.hasOwnProperty('trade')) {
          this.setState(prevState => ({
            keys: [...prevState.keys, data.trade.timestamp],
            values: [...prevState.values, data.trade.price]
          }));
        }

        if (data.hasOwnProperty('ctrades')) {
          this.setState(prevState => ({
            predictionKeys: data.ctrades.map(item => item.timestamp),
            predictionValues: data.ctrades.map(item => item.price)
          }));
        }
      } catch (error) {
        return console.error("failed to parse message", data, error);
      }
    };
  }

  createConfig(label, keys, values) {
    return {
      labels: keys,
      datasets: [
        {
          label: label,
          data: values
        }
      ]
    }
  }

  render() {
    const {keys, values, predictionKeys, predictionValues, isLoading, error} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    let currency = this.props.routeParams.currency;

    let config = {
      labels: [...keys, ...predictionKeys],
      datasets: [
        {
          label: 'Values',
          data: values
        },
        {
          label: 'Predicted',
          borderColor: 'rgba(255,35,35,1)',
          data: [...values, ...predictionValues]
        }
      ]
    };

    return (
      <ContentWrapper>
        <PageTitle>{currency.charAt(0).toUpperCase() + currency.slice(1)}</PageTitle>
        <Line data={config}/>
        <PageSubtitle>Aktueller Kurs</PageSubtitle>
        <Line data={this.createConfig('Open', keys, values)}/>
        <PageSubtitle>Vorhersage</PageSubtitle>
        <Line data={this.createConfig('Open', predictionKeys, predictionValues)}/>
      </ContentWrapper>
    );
  }
}