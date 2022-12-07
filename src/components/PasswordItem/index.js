/* eslint-disable react/no-unknown-property */
import './index.css'

const PasswordItem = props => {
  const {passcodeDetails, onDelteItem, showClicked} = props
  const {id, initial, newColor, username, website, password} = passcodeDetails
  const deleteItem = () => {
    onDelteItem(id)
  }

  return (
    <li className="liItem" id={id}>
      <p className={`initial ${newColor}`}>{initial}</p>
      <div className="itemDiv">
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {!showClicked && (
          <img
            className="starsImg"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
        {showClicked && <p className="website">{password}</p>}
      </div>
      <button
        type="button"
        className="delBtn"
        onClick={deleteItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delImg"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
