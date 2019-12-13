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