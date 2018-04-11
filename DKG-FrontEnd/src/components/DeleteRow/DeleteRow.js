import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class DeleteRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BootstrapTable data={ this.props.AllRelations }
                      remote={ true }
                      deleteRow={ true }
                      selectRow={ { mode: 'radio' } }
                      options={ { onDeleteRow: this.props.onDeleteRow } }>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='fromConcept'>概念</TableHeaderColumn>
        <TableHeaderColumn dataField='relation'>关系</TableHeaderColumn>
        <TableHeaderColumn dataField='toConcept'>概念</TableHeaderColumn>
      </BootstrapTable>

    );
  }
}