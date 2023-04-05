import { AppDataSource } from "./data-source"

export default async () => {
    if(!AppDataSource.isInitialized) {
        return await AppDataSource.initialize()
    }
    
    return AppDataSource
}