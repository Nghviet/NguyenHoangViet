import { DatabaseInterface } from "./database/database";
import { LokiJSDBInterface } from "./database/db_api/lokijs";


export class GlobalVariable {
    private static _database_instance : DatabaseInterface;

    static getDatabase() {
        if(this._database_instance) 
            return this._database_instance;

        if(!process.env.DB_ENGINE) 
            process.env.DB_ENGINE = "LokiJS";

        switch(process.env.DB_ENGINE) {
            case "LokiJS":
                this._database_instance = new LokiJSDBInterface();
                break;

            default: 
                throw new Error(`Unsupported database engine config: ${process.env.DB_ENGINE}`)
        }
        
        return this._database_instance;
    }
}