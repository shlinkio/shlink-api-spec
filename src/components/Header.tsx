import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Headroom from 'react-headroom';
import { useRouter } from '../helpers';
import './Header.css';

export interface HeaderProps {
  setTag: (newTag: string) => void;
  tags: string[];
}

const Header: FunctionComponent<HeaderProps> = ({ setTag, tags }) => {
  const { query } = useRouter();
  const [ activeTag, setActiveTag ] = useState('');
  const onTagChange = ({ target }: ChangeEvent<HTMLSelectElement>) => setTag(target.value);

  useEffect(() => {
    setActiveTag(String(query.version));
  }, [ query ]);

  return (
    <Headroom>
      <header className="header swagger-ui">
        <div className="wrapper">
          <h2 className="header__title">
            <img
              src="https://shlink.io/images/shlink-logo-white.png"
              alt="Shlink"
              width="30"
              className="header__title-logo"
            />{' '}
            Shlink<span className="header__subtitle"> - <small>The URL shortener</small></span>
          </h2>
          <select className="header__tags-list" value={activeTag} onChange={onTagChange}>
            {tags.map((tag: string) => <option key={tag} value={tag}>Shlink {tag}</option>)}
          </select>
        </div>
      </header>
    </Headroom>
  );
};

export default Header;
