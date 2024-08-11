import { PositionState } from "../types/position-state.type";
import { Transaction } from "./transaction.interface";
import { AssetType } from "../types/asset.type";

export interface Position {
    positionId?: number;
    assetType?: AssetType;
    assetName?: string;
    positionState?: PositionState;
    roi?: number;
    total?: number;
    aggregate?: number;
    transactions?: Transaction[];
}