
let url = process.env.REACT_APP_API_URL
const Swal = require('sweetalert2')

export const fetchData=(page, filter)=>{
  let filterData = {
    poinFrom: '',
    poinTo: '',
    stringType: ''
  }
  if (Object.keys(filter).length > 0) {
    if (filter.poinFrom) filterData.poinFrom = filter.poinFrom
    if (filter.poinTo && filter.poinTo > 10000) filterData.poinTo = filter.poinTo
    if (filter.typeArray.length > 0) {
      filterData.stringType = filter.typeArray.filter(x => x !== 'All').join();
    }
  }
  
  return (dispatch) => {
    fetch(url+`/awards?page=${page}&size=3&poinFrom=${filterData.poinFrom}&poinTo=${filterData.poinTo}&type=${filterData.stringType}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FETCH_DATA',
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_DATA'
        })
      })
      .finally(() => {
        dispatch({
          type: 'LOADING_DATA'
        })
      })
  }
}

export const signIn=(email, navigate)=>{
  let data = {email}
  return () => {
    fetch(url+'/login',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 404) {
          Swal.fire({
            title: 'Error!',
            text: data.message[0],
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else {
          navigate('/feed')
        }
      })
      .catch(err=>console.log(err))
  }
}

export const filterData=(filter)=>{
  let typeString = ''
  if (filter.typeArray.length > 0) {
    typeString = filter.typeArray.filter(x => x !== 'All').join();
  }
  return (dispatch) => {
    fetch(url+`/awards?page=0&size=3&poinFrom=${filter.poinFrom}&poinTo=${filter.poinTo > 10000 ? filter.poinTo : ''}&type=${typeString}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'FILTER_DATA',
          payload: {data, filter}
        })
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_DATA'
        })
      })
      .finally(() => {
        dispatch({
          type: 'LOADING_DATA'
        })
      })
  }
}
