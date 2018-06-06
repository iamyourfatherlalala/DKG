import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const jobs = [];

function addJobs(quantity) {
  const startId = jobs.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    let priority = 'true';
    if (i % 2 === 0) priority = 'false';
    if (i % 5 === 0) priority = 'true';
    if (i % 7 === 0) priority = 'false';
    jobs.push({
      id: id,
      name: 'user' + id,
      password: id,
      //priority: priority,
      DKG: i % 2 === 0 ? 'Y' : 'N',
      NER: i % 2 === 1 ? 'Y' : 'N'
    });
  }
}

addJobs(70);

function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  console.log(`Save cell ${cellName} with value ${cellValue}`);
  console.log('The whole row :');
  console.log(row);
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  console.log('onAfterDeleteRow');
  console.log(rowKeys);
}

function onAfterInsertRow(row) {
  console.log('onAfterInsertRow');
  console.log(row);
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

const options = {
  paginationShowsTotal: true,
  sortName: 'name',  // default sort column name
  sortOrder: 'desc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};


function priorityFormatter(cell, row) {
  if (cell === 'A') return '<font color="red">' + cell + '</font>';
  else if (cell === 'B') return '<font color="orange">' + cell + '</font>';
  else return cell;
}

// function trClassNameFormat(rowData, rIndex) {
//   return rIndex % 3 === 0 ? 'third-tr' : '';
// }
function nameValidator(value) {
  if (!value) {
    return 'Job Name is required!';
  } else if (value.length < 3) {
    return 'Job Name length must great 3 char';
  }
  return true;
}
function priorityValidator(value) {
  if (!value) {
    return 'Priority is required!';
  }
  return true;
}

export default class App extends React.Component {
  render() {
    return (
      <BootstrapTable data={jobs}
        // trClassName={ trClassNameFormat }
        selectRow={selectRowProp}
        cellEdit={cellEditProp}
        options={options}
        insertRow
        deleteRow
        search
        columnFilter
        hover
        pagination>
        <TableHeaderColumn dataField='id' dataAlign='center' dataSort isKey autoValue>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' className='good' dataSort
          editable={{ type: 'textarea', validator: nameValidator }}>用户名</TableHeaderColumn>
         <TableHeaderColumn dataField='password' className='good' dataSort
          editable={{ type: 'textarea', validator: nameValidator }}>密码</TableHeaderColumn>
        {/* <TableHeaderColumn dataField='priority' dataSort dataFormat={priorityFormatter}
          editable={{
            type: 'select',
            options: { values: ['true', 'false'] },
            validator: priorityValidator
          }}>Job Priority</TableHeaderColumn> */}
        <TableHeaderColumn dataField='DKG'
          editable={{ type: 'checkbox', options: { values: ' Y:N' } }}>DKG权限</TableHeaderColumn>
        <TableHeaderColumn dataField='NER'
          editable={{ type: 'checkbox', options: { values: ' Y:N' } }}>NER权限</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
