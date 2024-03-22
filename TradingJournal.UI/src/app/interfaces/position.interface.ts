import { PositionState } from "../types/position-state.type";
import { Transaction } from "./transaction.interface";
import { AssetType } from "../types/asset.type";

export interface Position {
    positionId?: number;
    assetType?: AssetType;
    label?: string;
    positionState?: PositionState;
    roi?: number;
    transactions?: Transaction[];
}