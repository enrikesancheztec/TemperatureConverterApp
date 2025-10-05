import { TemperatureVO } from '../valueobjects/TemperatureVO';
import { API_BASE_URL } from '@env';

/**
 * Proxy para convertir temperaturas usando un servicio HTTP.
 */
const TemperatureServiceProxy = () => {
    /**
     * Convierte una temperatura usando el endpoint remoto.
     * @param {TemperatureVO} temperature - Objeto con valor y unidad.
     * @returns {Promise<TemperatureVO>} - Promesa que resuelve con el objeto convertido.
     */
    async function convert(temperature) {
        const response = await fetch(API_BASE_URL + '/v1/temperature/convert/FAHRENHEIT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temperature),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return new TemperatureVO(data.value, data.unit);
    }

    return { convert };
};

export default TemperatureServiceProxy;