import React, { useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';
import { getToken } from '../../redux/operations/operations';

function CoreLayout({ children , history }) {
  useEffect(()=>{
    const token = (getToken())
    token.then(res=> localStorage.setItem("token",res))
  },[]);

  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header history={history} />
        <div className="main__content__child">
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
