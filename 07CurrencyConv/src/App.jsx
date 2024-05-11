import { useState } from 'react';
import { InputBox } from './components';
import './App.css';
import backgroundImage from './assets/bg.jpg';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('inr');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const currencyinfo = useCurrencyInfo(from);

    const options = Object.keys(currencyinfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        setConvertedAmount(amount * currencyinfo[to]);
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-between items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="flex justify-center items-center h-screen">
                <div className="m-4">
                    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/20">
                        <h1 className="text-center mb-7 text-3xl font-extrabold leading-none tracking-tight md:text-2xl text-white">Currency Converter</h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setFrom(currency)}
                                    selectCurrency={from}
                                    onAmountChange={(amount) => setAmount(amount)}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 shadow-lg transform scale-95 hover:bg-gradient-to-br hover:scale-90 transition-transform text-white font-semibold py-2 px-4 rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setTo(currency)}
                                    selectCurrency={to}
                                    amountDisable
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <footer className="rounded-lg shadow-lg m-4 bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm sm:text-center text-gray-400">creator | <a href="https://instagram.com/aquib.lqbal" className="underline text-blue-500 hover:underline">AquibIqbal</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
