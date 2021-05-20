import React, { Component } from 'react';
//Props needed Columns:Array,Onsort:Object,sortColumn
class TableHeader extends Component {
    onraiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn }
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        console.log(path);
        this.props.onSort(sortColumn);
    };
    renderIcons = column => {
        if (column.path !== this.props.sortColumn.path) return null;
        if(this.props.sortColumn.order=='asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }
    render() { 
        return (<thead>
            <tr>
                {this.props.columns.map(column => (<th key={column.path || column.key} onClick={() => this.onraiseSort(column.path)}  className="th">{column.label}{" " }{ this.renderIcons(column)}</th>))} 
            </tr>
        </thead>  );
    }
}
 
export default TableHeader;