import { TemperatureVO } from '../../valueobjects/TemperatureVO';
import TemperatureServiceProxy from '../../proxies/TemperatureServiceProxy';

global.fetch = jest.fn();

describe("TemperatureServiceProxy unit tests", () => {
    const { convert } = TemperatureServiceProxy();

    beforeEach(() => {
        jest.mock('@env');
    });

    afterEach(() => {
        fetch.mockClear();
    });

    test('Given Temperature 20C When convert Then 68F', async () => {
        // GIVEN
        const input = new TemperatureVO(20, "CELSIUS");
        const expectedOutput = { value: 68, unit: "FAHRENHEIT" };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => expectedOutput,
        });

        // WHEN
        const actualOutput = await convert(input);

        // THEN
        expect(actualOutput.value).toBe(expectedOutput.value);
        expect(actualOutput.unit).toBe(expectedOutput.unit);
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/v1/temperature/convert/FAHRENHEIT',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            })
        );
    });

    test('Given Temperature 68F When convert Then error 500', async () => {
        // GIVEN
        const input = new TemperatureVO(68, "FAHRENHEIT");

        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({}),
        });

        // WHEN / THEN
        await expect(convert(input)).rejects.toThrow('Error al convertir');
    });

    test('Given Temperature 68F When convert Then error 400', async () => {
        // GIVEN
        const input = new TemperatureVO(68, "FAHRENHEIT");

        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({}),
        });

        // WHEN / THEN
        await expect(convert(input)).rejects.toThrow('Datos de entrada inválidos');
    });

    test('Given Temperature 68F When convert Then error 503', async () => {
        // GIVEN
        const input = new TemperatureVO(68, "FAHRENHEIT");

        fetch.mockResolvedValueOnce({
            ok: false,
            status: 503,
            json: async () => ({}),
        });

        // WHEN / THEN
        await expect(convert(input)).rejects.toThrow('Servicio no disponible');
    });
});