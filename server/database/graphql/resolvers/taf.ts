import { ID, Filter } from "./index";
import { TAF, TAFFilter } from "../../models/taf";
import { getTAFs, getTAFById } from "../../../app/controllers/taf";
import { getTAFStudents } from "../../../app/controllers/user";

export const tafResolver = {
    Query: {
        tafs: (_: null, { filter }: Filter<TAFFilter>) => getTAFs(filter),
        taf: (_: null, { id }: ID) => getTAFById(id),
    },
    TAF: {
        students: (taf: TAF) => getTAFStudents(taf.id),
    },
};
