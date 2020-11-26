import '../assets/styles/main.scss'
import '../assets/styles/search.scss'
import '../assets/styles/item-detail.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
    library.add(faSearch)
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Component {...pageProps} />
  }