import { ClassType } from "./classType";

export default interface Classed {
    predictionClass: Prediction[];
}

export interface Prediction {
    className: ClassType
    prediction: number;
}