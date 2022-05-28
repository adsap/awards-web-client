/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef } from 'react'
import star from '../assets/star.svg'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { filterData } from '../store/actionCreator'

const Navbar = () => {
  const leftNavRef = useRef(null)
  const rightNavRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const poinFrom = 10000
  let [poinTo, setPoinTo] = useState(10000)
  let [typeValue, setTypeValue] = useState({
    All : false,
    Vouchers: false,
    Products: false,
    Others: false
  })
  let [filterCheck, setFilterCheck] = useState({
    poin: false,
    type: false
  })


  const openLeftNav = () => {
    leftNavRef.current.style.width = "250px"
  };

  const closeLeftNav = () => {
    leftNavRef.current.style.width = "0px"
  };

  const openRightNav = () => {
    rightNavRef.current.style.width = "350px"
  };

  const closeRightNav = () => {
    rightNavRef.current.style.width = "0px"
  };

  const toFeed = () => {
    leftNavRef.current.style.width = "0px"
    navigate('/feed')
  };

  const toWelcome = () => {
    leftNavRef.current.style.width = "0px"
    navigate('/')
  };

  const onChangeHandle = (e) => {
    const {value} = e.target
    if (value > 10000) {
      setPoinTo(value-10000)
      setFilterCheck({...filterCheck, poin:true})
    } else {
      setPoinTo(poinFrom)
      setFilterCheck({...filterCheck, poin:false})
    }
    
  }

  const checkboxHandle = (e) => {
    const {name, checked} = e.target
    if (name === 'All') {
      setTypeValue({
        All : checked,
        Vouchers: checked,
        Products: checked,
        Others: checked
      })
    } else {
      setTypeValue({...typeValue, [name]:checked})
    }
    let flag = true
    if (checked) {
      setFilterCheck({...filterCheck, type:true})
    } else {
      flag = false
      for (const key in typeValue) {
        if (key !== name && typeValue[key]) {
          flag = true
          break
        }
      }
      if (!flag) setFilterCheck({...filterCheck, type:false})
    }
  }

  const clearFilterHandle = () => {
    setTypeValue({
      All : false,
      Vouchers: false,
      Products: false,
      Others: false
    })
    setFilterCheck({
      poin: false,
      type: false
    })
    setPoinTo(poinFrom)
  }
  
  const clearFilterPoin = () => {
    setPoinTo(poinFrom)
    setFilterCheck({...filterCheck, poin:false})
  }
  
  const clearFilterType = () => {
    setTypeValue({
      All : false,
      Vouchers: false,
      Products: false,
      Others: false
    })
    setFilterCheck({...filterCheck, type:false})
  }

  const onClickFilter = () => {
    let typeArray = []
    for (const key in typeValue) {
      if (key === 'All' && typeValue[key]) {
        break
      }
      if (typeValue[key]) {
        if (key === 'Others') {
          typeArray.push('Giftcard')
        } else {
          typeArray.push(key)
        }
      }
    }
    dispatch(filterData({typeArray, poinFrom, poinTo}))
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-start">
          <i className="fa fa-bars" aria-hidden="true" onClick={()=>openLeftNav()}></i>
        </div>
        <div className="container-fluid justify-content-center">
          <span className="navbar-brand mb-0 h1">Awards</span>
        </div>
        <div className="container-fluid justify-content-end">
          <i className="fa fa-filter" aria-hidden="true" onClick={()=>openRightNav()}></i>
        </div>
      </nav>

      <div id="leftSidenav" className="sidenav" ref={leftNavRef} style={{left: 0}}>
        <a className="closebtn" onClick={()=>closeLeftNav()}>&times;</a>
        <div className="container mt-3">
          <div className="text-center">
            <img src={star} alt="thumbnail" className="img-thumbnail" width={50} height={50}/>
            <p className="fs-5 mt-2">AWARDS MENU</p>
          </div>
        </div>
        <a className="enabled" onClick={()=>toFeed()}>Home</a>
        <a className="disabled" href="#">Cards</a>
        <a className="disabled" href="#">Profile</a>
        <a className="enabled" onClick={()=>toWelcome()}>Logout</a>
      </div>

      <div id="rightSidenav" className="sidenav" ref={rightNavRef} style={{right: 0}}>
        <a className="closebtn" onClick={()=>closeRightNav()}>&times;</a>
        <div className="container mt-3">
          <div className="text-start">
            <p className="fs-5 mt-2">FILTER</p>
          </div>
          {
            poinTo > 10000 ?
              <div className="text-start mb-2">
                <button type="button" className="btn btn-outline-primary">Poin: {poinFrom} - {poinTo}
                <i className="fa fa-close ms-2" aria-hidden="true" onClick={() => clearFilterPoin()} style={{cursor:'pointer'}}></i></button>
              </div>
              : null            
          }
          {
            typeValue.All ||  typeValue.Vouchers || typeValue.Products || typeValue.Others ?
              <div className="text-start mb-2">
                <button type="button" className="btn btn-outline-primary">Type: { Object.entries(typeValue).map(
                    ([key, value]) => 
                    key !== 'All' && value ? key+', ' : null
                )}
                <i className="fa fa-close ms-2" aria-hidden="true" onClick={() => clearFilterType()} style={{cursor:'pointer'}}></i></button>
              </div> 
              : null
          }
          {
            filterCheck.poin && filterCheck.type ?
              <div className="text-start mb-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => clearFilterHandle()}>Clear All Filter</button>
              </div>
              : null            
          }
          <div className="text-start">
            <p className="mt-2 mb-0">Poin Needed</p>
            <p className="text-primary float-start">IDR {poinFrom.toLocaleString()}</p>
            <p className="text-primary float-end">IDR {poinTo.toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <input type="range" name='poinRange' className="slider" min="10000" max="1010000" step="100000" id="customRange2" style={{width: '100%'}} onChange={(e)=>{onChangeHandle(e)}} value={poinTo}/>
          </div>
          <div>
            <p className="mt-4 mb-2">Award Type</p>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={typeValue.All} id="flexCheckDefault" name="All" onChange={(e)=>{checkboxHandle(e)}}/>
              <label className="form-check-label text-primary" htmlFor="flexCheckDefault">
                All Type
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={typeValue.Vouchers} id="flexCheckDefault" name="Vouchers" onChange={(e)=>{checkboxHandle(e)}}/>
              <label className="form-check-label text-primary" htmlFor="flexCheckDefault">
                Vouchers
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={typeValue.Products} id="flexCheckDefault" name="Products" onChange={(e)=>{checkboxHandle(e)}}/>
              <label className="form-check-label text-primary" htmlFor="flexCheckDefault">
                Products
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={typeValue.Others} id="flexCheckDefault" name="Others" onChange={(e)=>{checkboxHandle(e)}}/>
              <label className="form-check-label text-primary" htmlFor="flexCheckDefault">
                Others
              </label>
            </div>
            <div className="mt-5 d-grid gap-2">
              <button type="button" className="btn btn-primary" onClick={() => onClickFilter()}>Filter</button>
            </div>
          </div>
        </div>
      </div>
  
    </>
  )
}

export default Navbar