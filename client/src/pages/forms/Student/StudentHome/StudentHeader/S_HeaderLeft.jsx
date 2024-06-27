import { Link } from 'react-router-dom';
import image from './mareslogo.jpg'
const S_HeaderLeft = () => {
    return (

        <div>
            <Link to={'/'}>
                <img src={image} alt="" className="header-logo" />
            </Link>
        </div>
    );
}

export default S_HeaderLeft;