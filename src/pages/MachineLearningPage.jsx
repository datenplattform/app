import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import PageSubtitle from '../components/PageSubtitle';
import ContentWrapper from '../components/ContentWrapper';
import ReactDataGrid from 'react-data-grid';
import ReactFileReader from 'react-file-reader';
import parse from 'csv-parse';

export default class MachineLearningPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      rows: [],
      columns: []
    };

    this.fetchCurrency('bitcoin');
  }

  fetchCurrency = currency => {
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch('http://localhost:5000/api/rest/currencies/' + currency + '.json', options)
      .then(response => response.json())
      .then(data => {
        let columns = Object.keys(data[0]).map(column => {
          return {
            key: column,
            name: column
          };
        });

        return this.setState({
          columns: columns,
          rows: data,
          isLoading: false
        });
      });
  };

  rowGetter = i => {
    return this.state.rows[i];
  };

  uploadFile = files => {
    let reader = new FileReader();
    reader.onload = function () {
      console.log(reader.result);
      parse(reader.result, {
        auto_parse: true
      }, (err, data) => {
        console.log(data);
      });
    };
  };

  render() {
    const {isLoading, error, columns, rows} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <ContentWrapper>
        <PageTitle>Maschinelles Lernen</PageTitle>
        <PageSubtitle>Lernen</PageSubtitle>
        <ReactFileReader handleFiles={this.uploadFile} fileTypes={'.csv'}>
          <button className='btn'>Upload</button>
        </ReactFileReader>
        <ReactDataGrid
          enableCellSelect={true}
          columns={columns}
          rowsCount={rows.length}
          rowGetter={this.rowGetter}
          minHeight={500}
        />
        <PageSubtitle>Vorhersage</PageSubtitle>
      </ContentWrapper>
    );
  }
}