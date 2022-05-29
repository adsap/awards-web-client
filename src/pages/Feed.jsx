import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../store/actionCreator'
import Navbar from '../components/Navbar'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ReactPaginate from 'react-paginate'

const Feed = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState(useSelector(state => state.filter))

  const handlePageClick = (e) => {
    setFilter(state.filter)
    setPage(e.selected)
  };
  

  useEffect(() => {
    dispatch(fetchData(page, filter))
    // eslint-disable-next-line
  },[page, filter])

  if (state.loading) return (
    <div>Loading...</div>
  )
  if (state.error) return (
    <div>
      <h5>Error</h5>
    </div>
  )

  if (typeof state.data === 'string') return (
    <>
      <Navbar/>
        <div className="container mt-3">
          <h5>{state.data}</h5>
        </div>
    </>
  ) 

  return (
    <>
      <Navbar data={state.filter}/>
      <div className="container mt-3">
      { 
        state.data.vouchers.map((data) => (
          <div key={data.id}>
            <div className="card mx-auto" style={{ 'width': '30rem' }} >
              <div className="card-body">
                <div className="text-end mb-2">
                  <button className={`btn btn-sm ${data.type === 'Vouchers' ? 'btn-primary' : data.type === 'Products' ? 'btn-warning' : 'btn-success'}`} style={{ 'borderRadius': '8px' }}>{data.type}</button>
                </div>
                <LazyLoadImage src={data.image} className="card-img-top mb-2" alt="voucher-img" loading="lazy" width={300} height={300} />
                <p className="card-text">{data.poin.toLocaleString()} Poin</p>
              </div>
            </div>
            <div className="card mx-auto mb-3" style={{ 'width': '30rem', 'border': 'none' }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item fw-bold">{data.name}</li>
              </ul>
            </div>
          </div>
        )) 
      }
        <div className="pagination">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={(e)=>{handlePageClick(e)}}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={state.data.totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  )
  
  

}

export default Feed