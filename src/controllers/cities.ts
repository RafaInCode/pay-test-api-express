import { Request, Response } from "express";
import Data from "../data/data";

/*
app.get("/city/:cityId", citiesController.getCity);
app.get("/city/:cityId/period/:start/to/:end", citiesController.getCityWeatherPeriod);
app.get("/city/coordinates/:lat/:lon", citiesController.getCityByCoordinates);
*/

/**
 * @api {get} /cities 1. Lista Cidades
 * @apiGroup Cidade
 *
 * @apiExample {js} Exemplo:
 *           curl -i http://localhost:8080/cities
 *
 * @apiSuccess {Array[]} _      Lista de cidades
 * 
 * @apiVersion 0.1.0
 */
export const index = (req: Request, res: Response) => {
    res.status(200).send(Data.data.City);
};

/**
 * @api {get} /cities:id 2. Obtem cidade por ID
 * @apiName Obtem cidade por ID
 * @apiGroup Cidade
 *
 * @apiExample {js} Exemplo:
 *           curl -i http://localhost:8080/city/3992619
 * 
 * @apiParam {Number} id City
 * 
 * @apiSuccess {Number}     id          Identificador único
 * @apiSuccess {Object}     coord       Coordenadas globais
 * @apiSuccess {String}     country     País onde está localizada
 * @apiSuccess {Object}     geoname     Geonames da cidade
 * @apiSuccess {String}     name        Node da cidade
 * @apiSuccess {Object}     stat        Estatísticas   
 * @apiSuccess {Object}     stations    Estações
 * @apiSuccess {Number}     zoom        Proximidade
 *
 * @apiVersion 0.1.0
 */
export const getCity = (req: Request, res: Response) => {
    const city = Data.data.City.filter((city: any) => {
        return city.id == req.params.cityId;
    });

    const weather = Data.data.Weather.filter((weather: any) => {
        return weather.cityId == req.params.cityId;
    });

    if (weather.length) {
        city.push({ weather: weather[0].data });
    }

    res.status(200).send(city);
};

/**
 * @api {get} /cities 3. Obtem Cidade por Periodo do Clima
 * @apiName Obtem Cidade por Periodo do Clima
 * @apiGroup Cidade
 *
 * @apiExample {js} Exemplo:
 *           curl -i http://localhost:8080/city/3992619/period/2017-03-12/to/2017-03-21
 *
 * @apiSuccess {Array[]} _      Cidade
 *
 * @apiVersion 0.1.0
 */
export const getCityWeatherPeriod = (req: Request, res: Response) => {
    const city = Data.data.City.filter((city: any) => {
        return city.id == req.params.cityId;
    });

    const weather = Data.data.Weather.filter((weather: any) => {
        return weather.cityId == req.params.cityId;
    });
    
    if (weather.length) {
        const fltred = weather[0].data.filter((it: any) => { 
            const start = Date.parse(new Date(req.params.start + "T00:00:00").toLocaleDateString())/1000;
            const end = Date.parse(new Date(req.params.end + "T00:00:00").toLocaleDateString())/1000;

            
            return start < it.dt && it.dt < end;
        });

        city.push({ weather: fltred});
    }

    res.status(200).send(city);
};

/**
 * @api {get} /cities 4. Obtem Cidade pelas Coordenadas
 * @apiName Obtem Cidade pelas Coordenadas
 * @apiGroup Cidade
 *
 * @apiExample {js} Exemplo:
 *           curl -i http://localhost:8080/user/4711.
 *
 * @apiSuccess {Array[]} _      List of cities
 *
 * @apiVersion 0.1.0
 */
export const getCityByCoordinates = (req: Request, res: Response) => {
    const city = Data.data.City.filter((city: any) => {
        return city.coord.lat == req.params.lat && city.coord.lon == req.params.lon;
    });

    res.status(200).send(city);
};

/**
 * @api {get} /cities 5. Lista Cidades com Clima
 * @apiName Lista Cidades com Clima
 * @apiGroup Cidade
 *
 * @apiExample {js} Exemplo:
 *           curl -i http://localhost:8080/cities/weather/.
 *
 * @apiSuccess {Array[]} _      List of cities
 *
 * @apiVersion 0.1.0
 */
export const getCitiesWithWeather = (req: Request, res: Response) => {
    const list: Array<object> = [];
    Data.data.City.filter((city: any) => {
        const weather = Data.data.Weather.filter((weather: any) => {
            if (weather.cityId == city.id) {
                const anyCity: Record<string, any> = Object.assign({}, city);

                list.push(Object.assign(anyCity, { weather: weather.data }));
            }

            return weather.cityId == city.id;
        });

        return weather.length > 0;
    });

    res.status(200).send(list);
};
