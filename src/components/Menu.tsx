import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '../helpers';

export const Menu: FunctionComponent = () => {
  const { pathname, query } = useRouter();
  const version = query.get('version');
  const buildPath = (path: string): string => (version ? `${path}?version=${version}` : path);

  return (
    <div className="menu">
      <nav>
        <Link to={buildPath('/')} className={pathname.includes('async-api') ? '' : 'active'}>REST API spec</Link>
        <Link to={buildPath('/async-api')} className={pathname.includes('async-api') ? 'active' : ''}>
          Async API spec
        </Link>
      </nav>
    </div>
  );
};
