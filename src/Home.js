import React, { Component } from 'react';

import Logo from './components/Logo';
import Button from './components/Button';
import Dialog from './components/Dialog';

import check from './svg/check.svg';

const dialogs = {
  invoice: { title: 'When you pay...', button: `Let’s go` },
  zelle: { title: 'Pay with Zelle', button: 'OK' },
};

export default class Home extends Component {
  state = {
    modal: null,
  };

  canvas = React.createRef();

  buttons = [
    {
      name: 'card',
      text: 'credit card*',
      link: this.props.project.url,
    },
    { name: 'paypal' },
    { name: 'venmo' },
    { name: 'zelle' },
  ];

  handleClick(action) {
    switch (action) {
      case 'paypal':
        this.setState({
          modal: { dialog: 'invoice', link: action },
        });
        break;
      case 'venmo':
        this.setState({
          modal: {
            dialog: 'invoice',
            link: '/qr?' + this.props.project.number,
          },
        });
        break;
      case 'zelle':
        this.setState({
          modal: { dialog: 'zelle' },
        });
        break;
      default:
        break;
    }
  }

  handleHide = () => {
    this.setState({ modal: null });
  };

  render() {
    return !this.props.project.paid ? (
      <div className="content">
        <header>
          <Logo number={this.props.project.number} />
        </header>

        <main>
          <div className="buttons">
            {this.buttons.map((v, i) => (
              <Button
                key={i}
                button={v}
                onClick={() => this.handleClick(v.name)}
              />
            ))}
          </div>
        </main>

        <footer>
          <p>* credit card payments incur an additional charge</p>
        </footer>

        {!this.state.modal ? null : (
          <Dialog
            modal={{
              ...this.state.modal,
              ...dialogs[this.state.modal.dialog],
            }}
            number={this.props.project.number}
            onHide={this.handleHide}
          />
        )}

        <style jsx>{`
          .content {
            justify-content: stretch;
          }

          main {
            flex: 1;
            margin-top: 50px;
          }

          footer p {
            font: normal normal normal 12px/15px var(--font);
            color: var(--white);
            opacity: 0.88;
            margin-top: 0;
            margin-bottom: -30px;
            margin-left: 54px;
            margin-right: 54px;
            letter-spacing: 0.12px;

            text-align: center;
          }
        `}</style>
      </div>
    ) : (
      <div className="content">
        <header>
          <Logo number={this.props.project.number} />
        </header>

        <main>
          <div className="cont">
            <div className="upper">
              <img src={check} alt="check" draggable="false" />
              <div>You’re all set.</div>
            </div>
            <div className="lower">
              We’ve received payment for this project.
            </div>
          </div>
        </main>

        <style jsx>{`
          .content {
            justify-content: flex-start;
          }

          main {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          @media (min-width: 768px) {
            .cont {
              transform: scale(1.15);
            }
          }
          .upper {
            display: flex;
            justify-content: center;
            align-items: center;

            font: normal normal bold 20px/18px var(--font);
            color: var(--white);
          }
          .upper div {
            margin-left: 24px;
          }
          .lower {
            font: normal normal normal 15px/21px var(--font);
            color: var(--white);
            margin-left: 66px;
            margin-right: 66px;
            margin-top: 23px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
