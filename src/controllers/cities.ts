import { Request, Response } from "express";
import Data from "../data/data";

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
export const index = (req: Request, res: Response) => {
    res.status(200).send(Data.data.City);
};
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
export const getCityByCoordinates = (req: Request, res: Response) => {
    const city = Data.data.City.filter((city: any) => {
        return city.coord.lat == req.params.lat && city.coord.lon == req.params.lon;
    });

    res.status(200).send(city);
};
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