import {Axios} from 'axios';

class IEXClient {
	private axios: Axios;

	constructor() {
		this.axios = new Axios({
			baseURL: 'https://cloud.iexapis.com/stable',
			params: {
				token: 'pk_3573bc401ea148599956a50310e73d85',
			},
		});
	}

	public getHistoricalPrices = (symbol: string) => this.axios.get(`/stock/${symbol}/chart/1y?chartCloseOnly=true`);

	public getTopMarketCap = () => this.axios.get('/stock/market/list/mostactive');

	public getQuote = (symbol: string) => this.axios.get(`/stock/${symbol}/quote`);

	public getCompany = (symbol: string) => this.axios.get(`/stock/${symbol}/company`);
}

export default IEXClient;
