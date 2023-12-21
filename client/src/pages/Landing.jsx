import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Temporibus officiis,
                        harum iure est quam facilis assumenda?
                        Rem vitae saepe quia alias voluptas ex
                        error doloribus sunt vel, explicabo
                        laborum adipisci.
                    </p>
                    <Link to='/register' className='btn register-link'>
                        register
                    </Link>
                    <Link to='/login' className='btn'>
                        login / demo user
                    </Link>
                </div>
                <img src={main} alt="job hunt" className='
                img main-img'/>
            </div>
        </Wrapper>
    )
}

export default Landing