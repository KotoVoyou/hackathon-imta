import { ObjectId } from "mongoose";

import { model, TAF } from "../../database/models/taf";

export const getTAFs = (): Promise<Array<TAF>> =>
    new Promise((resolve, reject) => {
        model
            .find()
            .then((tafs) => resolve(tafs))
            .catch((error) => reject(error));
    });

export const getTAFById = (id: ObjectId): Promise<TAF> =>
    new Promise((resolve, reject) => {
        model
            .findById(id)
            .then((taf) => resolve(taf))
            .catch((error) => reject(error));
    });

export const createTAF = (newTAF: TAF): Promise<TAF> =>
    new Promise((resolve, reject) => {
        model
            .create(newTAF)
            .then((taf) => resolve(taf))
            .catch((error) => reject(error));
    });
