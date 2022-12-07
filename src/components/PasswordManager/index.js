import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    passcodeList: [],
    showClicked: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const colorClass = colorList[Math.floor(Math.random() * colorList.length)]
    const newPasscode = {
      id: uuidv4(),
      initial,
      website,
      username,
      password,
      newColor: colorClass,
    }
    this.setState(prevState => ({
      passcodeList: [...prevState.passcodeList, newPasscode],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  onClickShow = () => {
    this.setState(prevState => ({showClicked: !prevState.showClicked}))
  }

  onDelteItem = id => {
    this.setState(prevState => ({
      passcodeList: prevState.passcodeList.filter(each => each.id !== id),
    }))
  }

  getSavedPasswords = () => {
    const {passcodeList, showClicked, searchInput} = this.state
    const filteredList = passcodeList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const hasSavedList = filteredList.length > 0
    const x = (
      <ul className="saved-password-list-container">
        {filteredList.map(each => (
          <PasswordItem
            key={each.id}
            passcodeDetails={each}
            onDelteItem={this.onDelteItem}
            showClicked={showClicked}
          />
        ))}
      </ul>
    )
    const y = (
      <div className="no-saved-history">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-image"
        />
        <p className="no-password-heading">No Passwords</p>
      </div>
    )
    const displayTheSavedList = hasSavedList ? x : y
    return displayTheSavedList
  }

  render() {
    const {website, username, password, searchInput, passcodeList} = this.state
    const count = passcodeList.length
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-container1">
          <form className="password-input-container" onSubmit={this.onClickAdd}>
            <h1 className="title">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                className="user-input"
                placeholder="Enter Website"
                value={website}
                onChange={this.onWebsiteChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                className="user-input"
                placeholder="Enter Username"
                value={username}
                onChange={this.onUserNameChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                className="user-input"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="image-container">
            <img
              className="image-sm"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="image-lg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="card-container2">
          <div className="password-header">
            <div className="text">
              <h1 className="counter-headhing">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-input-logo"
              />
              <input
                type="search"
                className="user-search-input"
                placeholder="search"
                value={searchInput}
                onChange={this.onSearchInputChange}
              />
            </div>
          </div>
          <hr />
          <div className="saved-password-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="check"
                id="check"
                onClick={this.onClickShow}
              />
              <label htmlFor="check" className="label">
                Show passwords
              </label>
            </div>
            {this.getSavedPasswords()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
