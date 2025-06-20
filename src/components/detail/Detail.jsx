import "./detail.css"

const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" /> 
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>privacy % help</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <button>Exclue File</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  )
}

export default Detail 