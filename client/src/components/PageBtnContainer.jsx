import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageBtnContainer = () => {
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1
  })

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  return <Wrapper>
    <button type="button"
      className="btn prev-btn"
      onClick={() => {
        let prevPage = currentPage - 1
        if (prevPage < 1) {
          prevPage = totalPages
        }
        handlePageNumber(prevPage)
      }}>
      <HiChevronDoubleLeft />
      prev
    </button>
    <div className="btn-container">
      {pages.map(page => {
        return <button type="button" key={page}
          className={`btn page-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageNumber(page)}>
          {page}
        </button>
      })}
    </div>
    <button type="button" className="btn next-btn"
      onClick={() => {
        let nextPage = currentPage + 1
        if (nextPage > totalPages) {
          nextPage = 1
        }
        handlePageNumber(nextPage)
      }}>
      <HiChevronDoubleRight />
      next
    </button>
  </Wrapper>;
};
export default PageBtnContainer;
