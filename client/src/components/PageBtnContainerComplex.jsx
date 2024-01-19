import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageBtnContainerComplex = () => {
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

    const addPageButton = ({ page, activeClass }) => {
        return <button type="button" key={page}
            className={`btn page-btn ${activeClass ? 'active' : ''}`}
            onClick={() => handlePageNumber(page)}>
            {page}
        </button>
    }

    const renderPageButtons = () => {
        const pageButtons = []
        //first page
        pageButtons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }))
        //dots
        if (currentPage > 3) {
            pageButtons.push(<span className="page-btn dots" key='dots-1'>...</span>)
        }
        //one before current page
        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(addPageButton({ page: currentPage - 1, activeClass: false }))
        }
        //curret page
        if (currentPage !== 1 && currentPage !== totalPages) {
            pageButtons.push(addPageButton({ page: currentPage, activeClass: true }))
        }
        //one after current page
        if (currentPage !== totalPages && currentPage !== totalPages - 1) {
            pageButtons.push(addPageButton({ page: currentPage + 1, activeClass: false }))
        }
        //dots
        if (currentPage < totalPages - 2) {
            pageButtons.push(<span className="page-btn dots" key='dots+1'>...</span>)
        }
        //last page
        pageButtons.push(addPageButton({ page: totalPages, activeClass: currentPage === totalPages }))
        return pageButtons
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
            {renderPageButtons()}
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
export default PageBtnContainerComplex;
