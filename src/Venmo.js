import React, { Component } from 'react';

import qrcode from 'qrcode';
import detectMobile from 'detect-mobile-browser';

import Logo from './components/Logo';

const link = 'https://venmo.com/code?user_id=2862168697470976596';

const isMobile = detectMobile(false).isAny();

export default class Venmo extends Component {
  constructor(props) {
    super(props);

    if (props.project && props.project.paid)
      window.location.href = '/' + props.project.number;
  }

  canvas = React.createRef();

  componentDidMount() {
    if (isMobile) window.location = link;
    else
      qrcode.toCanvas(this.canvas.current, link, {
        margin: 2,
        width: 800,
        color: {
          dark: '#212529ff',
          light: '#00000000',
        },
      });
  }

  render() {
    return (
      <div className="content">
        <header>
          <Logo
            number={this.props.project ? this.props.project.number : null}
          />
        </header>

        <main>
          <p>Scan to pay with Venmo</p>
          <div className="cont">
            <div className="qr">
              <canvas ref={this.canvas}></canvas>
            </div>
          </div>
        </main>

        <footer>
          {!this.props.project ? null : (
            <a href="javascript:void(0)" onClick={() => window.history.back()}>
              &lt;&nbsp; Back to payment options
            </a>
          )}
          <a href={link}>Already on mobile?</a>
        </footer>

        <style jsx>{`
          .content {
            justify-content: stretch;
            align-items: stretch;
          }

          main {
            flex: 1;
            margin-top: 50px;
            margin-bottom: 50px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          main p {
            max-width: 296px;
            width: 100%;
            text-align: center;

            background: var(--lt-gray);
            font: normal normal normal 20px/15px var(--font);
            color: var(--accent-dark);

            padding: 12px;
            padding-top: 17px;
            padding-bottom: 17px;
            margin: 0;
            margin-bottom: -1px;

            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
          .cont {
            max-width: 350px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          @media (min-width: 768px) {
            .cont {
              max-width: 400px;
            }
            main p {
              max-width: 346px;
            }
          }
          @media (max-width: 424.999px) {
            main p {
              background: none;
              color: var(--white);
            }
          }

          .qr {
            background: white;
            padding-top: 100%;
            width: 100%;
            height: 0;
            border-radius: 17px;
            position: relative;
          }
          canvas {
            position: absolute;
            top: 0;
            left: 0;

            width: 100% !important;
            height: 100% !important;
          }

          footer {
            display: flex;
            justify-content: center;
            color: var(--white);
          }
          footer a {
            color: var(--white);
            font: normal normal normal 12px/15px var(--font);
            opacity: 0.88;
            margin-top: 0;
            margin-bottom: 10px;
            margin-left: 20px;
            margin-right: 20px;
            letter-spacing: 0.12px;

            text-align: center;
          }
          footer a:hover,
          footer a:focus {
            opacity: 1;
          }
        `}</style>
      </div>
    );
  }
}
