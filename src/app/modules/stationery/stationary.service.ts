import stationeryModel from "./stationary.model";
import { Stationery } from "./stationery.interface";

const createStationaryIntoDB = async (stationery : Stationery) => {
    
    const result = await stationeryModel.create(stationery)
    return result;
}

const getAllStationaryFromDB = async () => {
    const result = await stationeryModel.find();
    return result;
}

const getOneStationaryFromDB = async (_id:string) => {
    const result = await stationeryModel.findOne({_id})
    return result;
}

const updateOneStationaryInDB = async (_id:string) => {
    const result = await stationeryModel.updateOne({_id},{$set:{isDeleted: true}})
    return result;
}

const deleteOneStationaryFromDB = async (_id:string) => {
    const result = await stationeryModel.deleteOne({_id})
    return result;
}

export const StationeryServices = {
    createStationaryIntoDB,
    getAllStationaryFromDB,
    getOneStationaryFromDB,
    updateOneStationaryInDB,
    deleteOneStationaryFromDB
}