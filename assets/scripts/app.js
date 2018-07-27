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
    app.portfolio = mergeData(response);
    app.portfolioIncrease = true;
}).catch(e => {
    console.log(e);
    app.connected = false;
    app.error = true;
    app.statusTitle = 'Server Error'
    app.statusMessage = e;
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mergeData(arr) {
    let items = [];
    arr.map(item => {
        let key = item.currency.toLowerCase();
        item.id = providers[key].id;
        item.identifier = providers[key].identifier;
        item.name = providers[key].name;
        item.url = providers[key].url;
        item.svg = 'assets/images/icons/icons.svg#' + key;
        item.rate = ExchangeRatesToCAD.filter(rate => rate.currency == item.identifier)[0].rate;
        item.amountCDN = (item.amount * item.rate).toFixed(2);
        item.amountCDNFormatted = numberWithCommas(Math.abs(item.amountCDN));
        item.changeType = item.changeToday > 0 ? 'ChangeUp' : item.changeToday == 0 ? 'ChangeNone' : 'ChangeDown';
        item.changeSign = item.changeToday > 0 ? '+' : item.changeToday == 0 ? '' : '-';
        item.changeTodayCDN = (item.changeToday * item.rate).toFixed(2);
        item.changeTodayCDNFormatted = numberWithCommas(Math.abs(item.changeTodayCDN));
        items.push(item);
    });
    return items;
}
