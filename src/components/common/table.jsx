import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({
  columns,
  data,
  currentPage,
  dataLimit,
  handleSelection,
  getPaginatedData,
}) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody
        columns={columns}
        data={data}
        currentPage={currentPage}
        dataLimit={dataLimit}
        handleSelection={handleSelection}
        getPaginatedData={getPaginatedData}
      />
    </table>
  )
}

export default Table
