import React from 'react'
import { useEffect, useState } from 'react'
import Table from './table'

const Homepage = ({ data, dataLimit, handleSelection }) => {
  const columns = [
    { path: 'item.title', label: 'TicketNo' },
    { path: 'item.status', label: 'Status' },
    { path: 'item.sName', label: 'Name' },
    { path: 'item.sCity', label: 'City' },
    { path: 'item.sAmount', label: 'Amount' },
    { path: 'item.sCountry', label: 'Country' },
    { path: 'item.sReference', label: 'Reference' },
    { path: 'item.rName', label: 'Name' },
    { path: 'item.rCity', label: 'City' },
    { path: 'item.rAmount', label: 'Amount' },
    { path: 'item.rCountry', label: 'Country' },
    { path: 'item.name', label: 'Agent' },
  ]
  //   const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }
  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        <Table
          columns={columns}
          data={data}
          dataLimit={dataLimit}
          currentPage={currentPage}
          getPaginatedData={getPaginatedData}
          handleSelection={handleSelection}
          //sortColumn={sortColumn}
          //onSort={onSort}
        />
      </div>
    </div>
  )
}

export default Homepage
