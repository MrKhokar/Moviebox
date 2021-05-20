import React from 'react';
import TableHeader from './tableheader';
import Tablebody from './tableBody';
const Table = (props) => {
    const{columns,sortColumn,onSort,data}=props
    return (  <table className="table table-striped" style={{ marginTop: 20 }}>
            <TableHeader columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
                />
                <Tablebody
                    data={data}
                    columns={columns }/>
                     
            </table> );
}
 
export default Table;