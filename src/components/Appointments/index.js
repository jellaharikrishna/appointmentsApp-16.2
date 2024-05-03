import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isClickStarred: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: dateFormat,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onToggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredList = () => {
    const {isClickStarred} = this.state
    this.setState({isClickStarred: !isClickStarred})
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isClickStarred} = this.state

    if (isClickStarred) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, isClickStarred} = this.state
    const isFavouriteStarClassName = isClickStarred
      ? 'favorite-star'
      : 'unFavourite-star'
    const isFilteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="appointment-card">
            <form className="appointment-form" onSubmit={this.onSubmitForm}>
              <h1 className="title-heading">Add Appointment</h1>
              <div className="title-div">
                <label htmlFor="titleInput" className="sub-heading">
                  TITLE
                </label>
                <input
                  onChange={this.onChangeTitle}
                  id="titleInput"
                  className="title-input"
                  type="text"
                  value={title}
                  placeholder="Title"
                />
              </div>
              <div className="time-div">
                <label htmlFor="dateInput" className="sub-heading">
                  DATE
                </label>
                <input
                  onChange={this.onChangeDate}
                  id="dateInput"
                  className="date-input"
                  type="date"
                  value={date}
                  placeholder="Date"
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="image-div">
              <img
                className="img-icon"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="appointment-details-card">
            <div className="appointment-stared-div">
              <h1 className="sub-title-heading">Appointments</h1>
              <button
                type="button"
                className={isFavouriteStarClassName}
                onClick={this.onClickStarredList}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-details-lists">
              {isFilteredAppointmentList.map(eachAppoint => (
                <AppointmentItem
                  key={eachAppoint.id}
                  appointmentListDetails={eachAppoint}
                  onToggleIsFavorite={this.onToggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
