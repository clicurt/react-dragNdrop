import axios from 'axios'
import debounce from 'lodash/debounce'
/**
 * Axios api class
 *
 * @export
 * @class API
 */
export default class API {
  constructor({ url }) {
    this.url = url
    this.endpoints = {}
    this.Error = {}
    // this.headers =  {
    //   "Connection": " Keep-Alive",
    //   "Content-Encoding": "gzip",
    //   "Content-Type": " text/html; charset=utf-8",
    //   "Date": Date.now(),
    //   "Keep-Alive": "timeout=5, max=1000",
    //   "Cache-Control": "no-cache",
    //   "Pragma": "no-cache"
    // }
    this.postHeaders = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }

  /**
   * setBaseURL
   *
   * @memberof API
   * @param {Object} route - main route
   */
  createRoute = route => {
    console.log('route', route)
    this.endpoints[route.name] = this.createRouteEndpoints(route)
  }

  /**
   * create endpoint routes
   *
   * @memberof API
   * @param {Object} arrayOfRoutes - routes
   */
  createRoutes = arrayOfRoutes => {
    arrayOfRoutes.array.forEach(this.createRoute);
  }

  /**
   *
   *
   * @memberof API
   * @param {Object} name - route name
   */
  createRouteEndpoints = ({ name }) => {
    const endpoints = {}
    const resourceURL = `${this.url}/${name}`
    endpoints.getAll = ({ query } = {}) => axios.get(resourceURL, { params: { query } })
      .then(res => res.data)
      .catch(err => this.setErrorMsg(err))
    endpoints.getOne = ({ id }) => axios.get(`${resourceURL}/${id}`)
      .then(res => res.data)
      .catch(err => this.setErrorMsg(err))
    endpoints.create = ({ toCreate }) => axios.post(`${resourceURL}`, toCreate)
      .then(res => {
        console.log(res)
      })
      .catch(err => this.setErrorMsg(err))
    endpoints.update = ({ toUpdate }) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate)
    endpoints.delete = ({ id }) => axios.delete(`${resourceURL}/${id}`)
    endpoints.upload = ({ formData }) => {
      axios.post(`${resourceURL}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: debounce(progressEvent => {
          const { loaded, total } = progressEvent
          console.log({ progressEvent });
          console.log('Upload Progress: ', Math.round(loaded * 100 / total) + '%')
        }, 100)
      })
    }
    return endpoints
  }

  /**
   * custom error message
   * @param {any} err
   */
  setErrorMsg = err => {
    this.Error.message = `Something went wrong! Details -> ${err}`
  }

  /**
   * get custom error message
   *
   * @memberof API
   */
  getErrorMsg = () => {
    return this.Error
  }
}