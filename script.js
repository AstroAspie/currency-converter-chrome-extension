
const fetchData = async () => {
	let rates_data;
  const url = `https://data.fixer.io/api/latest?access_key=4b21a8244eee329c5b2487c543c13149`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    await response.json().then((res) => {
      rates_data = res.rates;
    });
  } catch (error) {
		console.error(error);
  }

	return rates_data
};

const setCurrencyList = (list_element, currencies) => {
	currencies.forEach(rate => {
		const option = document.createElement('option');
		option.value = rate;
		option.textContent = rate;
		list_element.appendChild(option);
	})
}

const convertCurrency = (convert_to, amount, data) => {
	return amount * data[convert_to];
};

const convertFrom = (rate_to, amount, rates) => {
  for (const ii = 0; ii < rates.length; ii++) {
    let from_rate = (amount * rate_to) / rate_to;
    return from_rate === amount ? from_rate : 0.0;
  }
};

const getBaseRate = (rates, amount) => {
	let base = amount / rates[fromCheck]
	console.log(base)
	return base;
}

const scrape = async (target) => {
  let currency = "USD";
  let amount = 200.0;

  /* Add scraping logic here */

  return {
    currency: currency,
    amount: amount,
  };
};

const fromCurrency = document.getElementById("from-currency");
let fromCheck = '';
const toCurrency = document.getElementById("to-currency");
let toCheck = '';
const amount = document.getElementById("amount");
const converted = document.getElementById("converted-amount");


async function main() {
	fetchData().then(res => {
		const rates = Object.keys(res);
		setCurrencyList(fromCurrency, rates);
		setCurrencyList(toCurrency, rates);
	})
}

fromCurrency.addEventListener('change', (event) => {
	fromCheck = event.target.value;
});

toCurrency.addEventListener('change', (event) => {
	toCheck = event.target.value;
})

const converterForm = document.getElementById('converter-form');
converterForm.addEventListener('submit', (event) => {
	event.preventDefault();
	let converted_data
	fetchData().then(rates => {
		let baseRate = getBaseRate(rates, amount.value)
		converted_data = convertCurrency(toCheck, baseRate, rates)
		converted.innerText = converted_data.toFixed(2);
	})
})

main()