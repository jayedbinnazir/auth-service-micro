import { DataSource } from "typeorm";
// import logger from "../../../src/config/logger";

export const truncateTable = async (connection: DataSource) => {
    const entities = connection.entityMetadatas;
    // logger.info(entities);
    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
    }
};
