import React, { Component } from 'react';

import Invoice from './dialogs/Invoice';
import Zelle from './dialogs/Zelle';

const links = (number) => ({
  paypal: 'https://paypal.me/vesmichael',
  venmo: '/qr?' + number,
});

export default class Dialog extends Component {
  state = {
    modal: null,
  };

  componentDidMount() {
    switch (this.props.modal.dialog) {
      case 'invoice':
        this.setState({ modal: <Invoice number={this.props.number} /> });
        break;
      case 'zelle':
        this.setState({ modal: <Zelle number={this.props.number} /> });
        break;
      default:
        break;
    }
  }

  render() {
    return !this.state.modal ? null : (
      <div className="content">
        <div className="bg" onClick={this.props.onHide}></div>

        <div className="modal">
          <div className="title">{this.props.modal.title}</div>
          <hr />
          <div className="text">{this.state.modal}</div>
          {this.props.modal.link ? (
            <a href={links(this.props.number)[this.props.modal.link]}>
              <div className="button">
                <div className="text">{this.props.modal.button}</div>
              </div>
            </a>
          ) : (
            <div className="button" onClick={this.props.onHide}>
              <div className="text">{this.props.modal.button}</div>
            </div>
          )}
        </div>

        <style jsx>{`
          .content {
            align-items: stretch;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            z-index: 1000;
          }
          @media (min-width: 768px) {
            .content {
              transform: scale(1.2);
            }
          }

          .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.55;
          }

          .modal {
            z-index: 1001;
            padding: 25px;
            padding-top: 16px;
            /* padding-bottom: 16px; */
            margin: 30px;

            border-radius: 20px;
            background: var(--white);
            box-shadow: 0px 10px 75px hsla(0, 0%, 0%, 0.08);

            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: stretch;
          }
          @media (min-width: 460px) {
            .modal {
              width: 350px;
              margin: auto;
            }
            .button {
              margin-top: 30px;
            }
          }

          .title {
            color: var(--black);
            font: normal normal bold var(--f-size) / var(--f-yspace) var(--font);
            letter-spacing: 0.21px;
            text-align: center;
          }
          hr {
            border: 0;
            border-top: 1px solid black;
            opacity: 0.14;
            margin-top: 11px;
            margin-bottom: 11px;
            width: 100%;
          }
          .text {
            position: relative;
            flex: 1;
          }
          .button {
            background: var(--black);
            padding: 9px;
            margin: 0;
            margin-top: 25px;

            box-shadow: 0px 1px 3px hsla(0, 0%, 0%, 0.239);
          }
          .button .text {
            font: normal normal bold 18px/25px var(--font);
            margin: 0;
            text-align: center;
          }
          a {
            text-decoration: none !important;
          }
        `}</style>
      </div>
    );
  }
}
