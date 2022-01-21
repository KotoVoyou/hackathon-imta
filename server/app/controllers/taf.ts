import { ObjectId } from "mongodb";

import { tafModel, TAF, TAFFilter } from "../../database/models/taf";

export const getTAFs = (filter: TAFFilter): Promise<Array<TAF>> =>
    new Promise((resolve, reject) => {
        tafModel
            .find(filter)
            .then((tafs) => resolve(tafs))
            .catch((error) => reject(error));
    });

export const getTAFById = (id: ObjectId): Promise<TAF> =>
    new Promise((resolve, reject) => {
        tafModel
            .findById(id)
            .then((taf) => resolve(taf))
            .catch((error) => reject(error));
    });

export const createTAF = (newTAF: TAF): Promise<TAF> =>
    new Promise((resolve, reject) => {
        tafModel
            .create(newTAF)
            .then((taf) => resolve(taf))
            .catch((error) => reject(error));
    });
