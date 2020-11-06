import React, { Component } from 'react';

import axios from 'axios';

import enums from './enums';
import { domain } from './isDev';

import Home from './Home';
import Message from './Message';
import Venmo from './Venmo';

export default class App extends Component {
  state = {
    ready: false,
    project: null,
    msg: '',
    qr: false,
  };

  showMsg(emsg, msg) {
    this.setState({
      ready: true,
      msg: emsg ? enums[emsg] : msg,
    });
  }

  async componentDidMount() {
    let id = window.location.pathname.slice(1);
    if (!id) return this.showMsg('ERROR_NO_ID');

    if (id === 'qr') {
      const inv = window.location.search.slice(1);
      if (!inv) return this.setState({ ready: true, qr: true });
      this.setState({ qr: true });
      id = inv;
    }

    try {
      const { data } = await axios.get(domain + 'api/invoice/' + id);
      this.setState({
        ready: true,
        project: data.invoice,
      });
    } catch (e) {
      if (!(e.response && e.response.data && e.response.data.error)) {
        console.log(e, e.response);
        this.showMsg('ERROR_UNKNOWN');
      } else {
        const r = e.response;
        if (r.status === 404) {
          if (this.state.qr) return this.setState({ ready: true });
          this.showMsg('ERROR_BAD_ID');
        } else this.showMsg(0, `Something went wrong. Error: ${r.data.error}`);
      }
    }
  }

  render() {
    return !this.state.ready ? null : (
      <div>
        <div className="container">
          <div>
            {this.state.msg ? (
              <Message msg={this.state.msg} />
            ) : this.state.qr ? (
              <Venmo project={this.state.project} />
            ) : (
              <Home project={this.state.project} />
            )}
          </div>
        </div>

        <style jsx>{`
          .container {
            position: absolute;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: stretch;
            justify-content: stretch;
          }
          .container > div {
            flex: 1;
            position: relative;

            padding: 30px;
            padding-top: 50px;
            padding-bottom: 50px;
          }
        `}</style>
      </div>
    );
  }
}
