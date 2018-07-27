var app = new Vue({
    el: '#app',
    data: {
        connected: false,
        error: false,
        errorMessage: '',
        portfolio: [],
        portfolioValue: 19500.31,
        portfolioValueFormatted: 'C$19,500.31',
        portfolioIncrease: true,
        priceChange: 8700.86,
        priceChangeFormatted: '+$8,700.86'

    }
});

const providers = {
  btc: {
    id: 'btc',
    identifier: 'BTC',
    name: 'Bitcoin',
    url: 'https://bitcoin.org/',
  },
  doge: {
    id: 'doge',
    identifier: 'DOGE',
    name: 'Dogecoin',
    url: 'https://dogecoin.com/',
  },
  eth: {
    id: 'eth',
    identifier: 'ETH',
    name: 'Ethereum',
    url: 'https://www.ethereum.org/',
  },
  ltc: {
    id: 'ltc',
    identifier: 'LTC',
    name: 'Litecoin',
    url: 'https://litecoin.com/',
  },
  mxr: {
    id: 'mxr',
    identifier: 'MXR',
    name: 'MaxVR',
    url: 'https://mxrcoin.com/',
  }
}

const portfolio = GetWallets().then(response => {
    console.log(response);
    app.connected = true;
    app.portfolio = response;
}).catch(e => {
    console.log(e);
    app.connected = false;
    app.error = true;
    app.errorMessage = e;
});
