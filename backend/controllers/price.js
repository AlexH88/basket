import axios from 'axios';

const url = "https://www.cbr-xml-daily.ru/daily_json.js";

const axiosPrice = async () => {
  try {
    return await axios.get(url)
  } catch (error) {
    console.error(error)
  }
}

export async function getPrice(req, res, next) {

	let objPrice = await axiosPrice();
	let obj = objPrice.data.Valute;
	let modifyObj = {};

	let valute = req.body.valute;
	let total = req.body.total;
	let baseValute = obj[valute].Value;

	for (var code in obj) {

		if(obj[code].CharCode !== valute){
			modifyObj[obj[code].CharCode] = ((baseValute/obj[code].Value)*total).toFixed(2);
		} else {
			modifyObj[obj[code].CharCode] = total;
		}
	}

	var JsonPrice = JSON.stringify(modifyObj);
	res.send(JsonPrice);

}