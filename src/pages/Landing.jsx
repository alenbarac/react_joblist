import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logo} alt="jobster logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dignissimos quod sed natus
            at quaerat in tenetur, autem iste consectetur?
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </main>
  )
}

export default Landing
