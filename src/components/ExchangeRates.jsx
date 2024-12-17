import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_EXCHANGE_RATES } from "../graphql/queries.js";
import { clientHasura } from "../graphql/client.js";
import {
  DollarSignIcon,
  PoundSterlingIcon,
  EuroIcon,
  CurrencyIcon,
} from "lucide-react";

const ExchangeRates = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rates, setRates] = useState([]);

  const [
    fetchExchangeRates,
    { data, loading: queryLoading, error: queryError },
  ] = useLazyQuery(GET_EXCHANGE_RATES, {
    client: clientHasura, // Use the Hasura client
  });

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  useEffect(() => {
    if (data) {
      setRates(data.get_exchange_rates.rates);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      setError(queryError);
      setLoading(false);
    }
  }, [queryError]);

  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case "USD":
        return <DollarSignIcon className="inline mr-2" />;
      case "GBP":
        return <PoundSterlingIcon className="inline mr-2" />;
      case "EUR":
        return <EuroIcon className="inline mr-2" />;
      case "ETB":
        return <CurrencyIcon className="inline mr-2" />;
      case "AED":
        return <CurrencyIcon className="inline mr-2" />;
      default:
        return <CurrencyIcon className="inline mr-2" />;
    }
  };

  const getCurrencyName = (currency) => {
    switch (currency) {
      case "USD":
        return "US Dollar";
      case "GBP":
        return "Pound Sterling";
      case "EUR":
        return "Euro";
      case "ETB":
        return "Ethiopian Birr";
      case "AED":
        return "United Arab Emirates Dirham";
      case "CNY":
        return "Chinese Yuan";
      case "KWD":
        return "Kuwaiti Dinar";
      case "CAD":
        return "Canadian Dollar";
      case "SAR":
        return "Saudi Riyal";
      case "JPY":
        return "Japanese Yen";
      case "CHF":
        return "Swiss Franc";
      default:
        return currency;
    }
  };

  const getFlagUrl = (currency) => {
    const flagMap = {
      USD: "https://flagcdn.com/w320/us.png", // US flag
      GBP: "https://flagcdn.com/w320/gb.png", // UK flag
      EUR: "https://flagcdn.com/w320/eu.png", // EU flag
      AED: "https://flagcdn.com/w320/ae.png", // UAE flag
      ETB: "https://flagcdn.com/w320/et.png", // Ethiopia flag
      CNY: "https://flagcdn.com/w320/cn.png", // China flag
      KWD: "https://flagcdn.com/w320/kw.png", // Kuwait flag
      CAD: "https://flagcdn.com/w320/ca.png", // Canada flag
      SAR: "https://flagcdn.com/w320/sa.png", // Saudi Arabia flag
      JPY: "https://flagcdn.com/w320/jp.png", // Japan flag
      CHF: "https://flagcdn.com/w320/ch.png", // Switzerland flag
    };
    return flagMap[currency] || "https://flagcdn.com/w320/placeholder.png";
  };

  if (loading || queryLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 text-2xl font-bold text-center">Exchange Rates</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {rates.map((rate) => (
          <div
            key={rate.currency}
            className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4"
          >
            <div className="absolute top-0 right-0 w-1/4 h-full rounded-tr-lg rounded-br-lg opacity-10">
              <img
                src={getFlagUrl(rate.currency)}
                alt={rate.currency}
                className="w-full h-full object-cover rounded-tr-lg"
              />
            </div>

            <div className="z-10 text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between w-full">
              <span className="mr-2">
                {getCurrencyIcon(rate.currency)}{" "}
                {getCurrencyName(rate.currency)}
              </span>
              <div className="text-lg font-bold text-blue-100">
                1 {rate.currency} = {rate.rate.toFixed(3)} ETB
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRates;
