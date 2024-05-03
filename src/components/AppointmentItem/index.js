import './index.css'

const AppointmentItem = props => {
  const {appointmentListDetails, onToggleIsFavorite} = props
  const {id, title, date, isFavorite} = appointmentListDetails

  const onClickIsFavorite = () => {
    onToggleIsFavorite(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div className="title-star-div">
        <p className="userinput-tilte">{title}</p>
        <button
          type="button"
          className="star-btn"
          data-testid="star"
          onClick={onClickIsFavorite}
        >
          <img className="star-img" src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="userinput-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
