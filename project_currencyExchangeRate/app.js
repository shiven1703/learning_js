let currencyList = document.querySelector("#currencyList");
let errorLabel = document.querySelector("#errorLabel");
let dataPlaceholder = document.querySelector("#dataPlaceholder");

const livePriceBtn = document.querySelector("#livePriceBtn");
livePriceBtn.addEventListener('click', fetchExchangeRate);


const getApiAccessKey = () => {
	return "6ee2631625fa7e43df843a00bfca87cf";
}

const getSelectedCurrency = () => {
	const currencyList = document.querySelector("#currencyList");
	return currencyList.options[currencyList.selectedIndex].value;
}
// for loading live exchange rate from API for selected currency.
function fetchExchangeRate(){
	const currency = getSelectedCurrency();
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `http://api.currencylayer.com/live?access_key=${getApiAccessKey()}&currencies=${currency}`, true);

	xhr.onload = () => {
		if(xhr.status === 200){
			const data = JSON.parse(xhr.responseText);
			if(data.success === true){
				loadExchangeRateTable(data.quotes);
			}else{
				showCustomApiErrors(data.error.code);
			}
		}
	}

	xhr.onerror = () => {
		errorLabel.innerHTML = "Error fetching data from API. Please try after sometime."
	}

	xhr.send();
}

function loadExchangeRateTable(data){
	const currency = Object.keys(data)[0];
	const price = data[Object.keys(data)[0]];

	dataPlaceholder.innerHTML = `
			<table>
			<tr>
				<th>Currency</th>
				<th>Price</th>	
			</tr>
			
			<tr>
				<td>${currency}</td>
				<td>${price}</td>
			</tr>

			</table>`;
}

// for loading available currencies from API.
const fetchAvailableCurrencies = () => {

	const xhr = new XMLHttpRequest();
	xhr.open('GET', `http://api.currencylayer.com/list?access_key=${getApiAccessKey()}`, true);

	xhr.onload = () => {
		if(xhr.status === 200){
			const data = JSON.parse(xhr.responseText);
			if(data.success === true){
				fillCurrencyListDropDown(data.currencies);
			}else{
				showCustomApiErrors(data.error.code);
			}
		}
	}

	xhr.onerror = () => {
		errorLabel.innerHTML = "Error fetching data from API. Please try after sometime."
	}

	xhr.send();
}

const fillCurrencyListDropDown = (data) => {
	for(currency in data){
		const listItem = document.createElement("option");
		listItem.setAttribute("value", currency);
		listItem.text = currency;

		currencyList.appendChild(listItem);
	}
}

// for handling custom error response code from API.
const showCustomApiErrors = (errorCode) => {
	if(errorCode === 104){
		errorLabel.innerHTML = "Monthly Free API calls are exceeded the limit.Please try after sometime."
	}
}


fetchAvailableCurrencies();