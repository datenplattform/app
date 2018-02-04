import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import ContentWrapper from '../components/ContentWrapper';
import BrowserService from '../services/BrowserService';
import ReactDataGrid from 'react-data-grid';

export default class DataVideoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      rows: [],
      columns: [],
      filters: {},
      sortColumn: null,
      sortDirection: null
    };

    this.fetchData();
  }

  fetchData = () => {
    // /Volumes/Repositories/datenplattform/youtube
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch('http://localhost:8080/search/bitcoin', options)
      .then(response => response.json())
      .then(data => {
        let columns = Object.keys(data[0]).filter(columnKey => {
          return ['title', 'channel', 'description', 'publishedAt'].indexOf(columnKey) > -1;
        }).map(columnKey => {
          let column = {
            key: columnKey,
            name: columnKey,
            filterable: true,
            sortable: true,
            resizable: true
          };

          let sizes = {
            title: 400,
            categoryId: 100,
            publishedAt: 200
          };
          if (sizes.hasOwnProperty(columnKey)) {
            column.width = sizes[columnKey];
          }

          let labels = {
            'title': 'Name',
            'channel': 'Kanal',
            'description': 'Beschreibung',
            'publishedAt': 'Datum',
            'tags': 'Schlagworte'
          };
          if (labels.hasOwnProperty(columnKey)) {
            column.name = labels[columnKey];
          }


          return column;
        });

        return this.setState({
          columns: columns,
          rows: data
        });
      });
  };

  rowGetter = i => {
    return this.state.rows[i];
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({sortColumn: sortColumn, sortDirection: sortDirection});
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    this.setState({filters: newFilters});
  };

  onClearFilters = () => {
    this.setState({filters: {}});
  };

  render() {
    let {isLoading, error, columns, rows} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <ContentWrapper>
        <PageTitle>DataVideo</PageTitle>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={columns}
          rowsCount={rows.length}
          rowGetter={this.rowGetter}
          minHeight={BrowserService.getDocumentHeight()}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
        />
      </ContentWrapper>
    );
  }
}

