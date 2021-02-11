import {OBSTACLE, NORMAL, LO_WEIGHT, MED_WEIGHT, HI_WEIGHT} from "./NodeTypes";

const WALL_N = "Wall";
const LO_WEIGHT_N = "Light Weight";
const MED_WEIGHT_N = "Medium Weight";
const HI_WEIGHT_N = "Heavy Weight";
const ERASER_N = "Eraser";

const ALL_NAMES = [WALL_N, LO_WEIGHT_N, MED_WEIGHT_N, HI_WEIGHT_N, ERASER_N]
const WEIGHTS = [LO_WEIGHT_N, MED_WEIGHT_N, HI_WEIGHT_N]

const NAME_TO_COLOR = new Map([
    [WALL_N, OBSTACLE],
    [LO_WEIGHT_N, LO_WEIGHT],
    [MED_WEIGHT_N, MED_WEIGHT],
    [HI_WEIGHT_N, HI_WEIGHT],
    [ERASER_N, NORMAL]
]);

const NAME_TO_ICON = new Map();

export {
    WALL_N, LO_WEIGHT_N, MED_WEIGHT_N, HI_WEIGHT_N,
    ERASER_N, ALL_NAMES, WEIGHTS, NAME_TO_COLOR
}