import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.EXCHANGE_API_KEY!;

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  const response = await axios.get(
    `http://v6/exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
  );

  if (response.data.result === "success") {
    return response.data.conversion_result;
  } else {
    throw new Error("Currency conversion failed");
  }
}
