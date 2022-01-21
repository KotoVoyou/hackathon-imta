import { ObjectId } from "mongodb";

import { model, Slot } from "../../database/models/slot";

export const getSlots = (): Promise<Array<Slot>> =>
    new Promise((resolve, reject) => {
        model
            .find()
            .then((slots) => resolve(slots))
            .catch((error) => reject(error));
    });

export const getSlotById = (id: ObjectId): Promise<Slot> =>
    new Promise((resolve, reject) => {
        model
            .findById(id)
            .then((slot) => resolve(slot))
            .catch((error) => reject(error));
    });

export const createSlot = (newSlot: Slot): Promise<Slot> =>
    new Promise((resolve, reject) => {
        model
            .create(newSlot)
            .then((slot) => resolve(slot))
            .catch((error) => reject(error));
    });
