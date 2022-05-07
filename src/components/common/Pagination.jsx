import React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function Pagination({
  data,
  pageLimit,
  dataLimit,
  selectedPage,
  setSelectedPage,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    if (selectedPage !== '') setCurrentPage(selectedPage)
  }, [selectedPage])
  function goToNextPage() {
    setSelectedPage(currentPage + 1)
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
    setSelectedPage(currentPage - 1)
    setCurrentPage((page) => page - 1)
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setSelectedPage(pageNumber)
    setCurrentPage(pageNumber)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      <div className="paginationAuditContainer">
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            Prev
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? 'active' : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            Next
          </button>
        </div>
        <div className="empty"></div>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  dataLimit: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  setPageState: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
  setSelectedPage: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
}

export default Pagination
