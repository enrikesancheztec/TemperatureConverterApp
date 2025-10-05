import { useState } from 'react';
import TemperatureServiceProxy from '../proxies/TemperatureServiceProxy';
import { TemperatureVO } from '../valueobjects/TemperatureVO';

const useTemperatureConverter = () => {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');
    const [error, setError] = useState('');
    const { convert } = TemperatureServiceProxy();

    function convertTemperature() {
        setError('');
        let originalCelsius = new TemperatureVO(celsius, 'CELSIUS');
        convert(originalCelsius, 'FAHRENHEIT')
            .then(convertedFahrenheit => {
                setFahrenheit(convertedFahrenheit.value);
            }).catch(error => {
                setError(error.message);
                console.log(error.message);
            });
    }

    return { celsius, setCelsius, fahrenheit, convertTemperature, error }
}

export default useTemperatureConverter;