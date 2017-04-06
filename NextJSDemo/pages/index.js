import Link from 'next/link';
import Header from '../components/Header';

export default () => (
  <div>
    <Header />
    
    <h1>Hi FORWARDJS! Welcome to next.js!</h1>
    <Link href="/about">
      <a>About Page</a>
    </Link>
  </div>
)