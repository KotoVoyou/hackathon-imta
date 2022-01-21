import { ID } from "./index";
import { getSlots, getSlotById } from "../../../app/controllers/slot";

export const slotResolver = {
    Query: {
        slots: () => getSlots(),
        slot: (_: null, { id }: ID) => getSlotById(id),
    },
};
