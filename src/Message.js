import React, { Component } from 'react';

import Logo from './components/Logo';

export default class Message extends Component {
  render() {
    return (
      <div className="content">
        <div className="logo">
          <Logo />
        </div>
        <p>{this.props.msg}</p>

        <style jsx>{`
          .logo {
            margin-bottom: 72px;
          }

          p {
            font: normal normal normal 15px/21px var(--font);
            color: var(--white);
            text-align: center;
            padding-left: 21px;
            padding-right: 21px;
            margin: 0;
          }
          @media (min-width: 768px) {
            p {
              font-size: 17px;
            }
          }
        `}</style>
      </div>
    );
  }
}
