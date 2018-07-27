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
