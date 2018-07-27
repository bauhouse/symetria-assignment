var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        error: false,
        statusHeading: 'Status',
        statusTitle: 'Connecting…',
        statusMessage: 'One moment, please.',
        panelHeading: 'Your Portfolio',
        panelSubheading: 'Portfolio Value',
        portfolio: [],
        portfolioValue: 19500.31,
        portfolioValueFormatted: 'C$19,500.31',
        portfolioIncrease: false,
        priceChange: 8700.86,
        priceChangeFormatted: '+$8,700.86'

    }
});

const providers = {
  btc: {
    id: 'btc',
    identifier: 'BTC',
    name: 'Bitcoin',
    url: 'https://bitcoin.org/'
  },
  doge: {
    id: 'doge',
    identifier: 'DOGE',
    name: 'Dogecoin',
    url: 'https://dogecoin.com/'
  },
  eth: {
    id: 'eth',
    identifier: 'ETH',
    name: 'Ethereum',
    url: 'https://www.ethereum.org/'
  },
  ltc: {
    id: 'ltc',
    identifier: 'LTC',
    name: 'Litecoin',
    url: 'https://litecoin.com/'
  },
  mxr: {
    id: 'mxr',
    identifier: 'MXR',
    name: 'MaxVR',
    url: 'https://mxrcoin.com/'
  },
  xmr: {
    id: 'xmr',
    identifier: 'XMR',
    name: 'Monero',
    url: 'https://monero.org/'
  }
}

const portfolio = GetWallets().then(response => {
    console.log(response);
    app.connected = true;
    app.panelHeading = 'Your Portfolio';
    app.panelSubheading = 'Portfolio Value';
    app.portfolio = response;
    app.portfolioIncrease = true;
}).catch(e => {
    console.log(e);
    app.connected = false;
    app.error = true;
    app.statusTitle = 'Server Error'
    app.statusMessage = e;
});
