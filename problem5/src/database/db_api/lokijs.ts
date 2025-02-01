import { QueryValueType, QueryComparisionType, BackendDBEngine, get_value_type } from "../../enum/enum";
import { DataModel } from "../../model/DataModel";
import { UserReviewDataModel } from "../../model/UserReviewDataModel";
import { converting_string_to_enum_type } from "../../util/utility";
import { DatabaseInterface, IFeatureQuery } from "../database";
import loki, { Collection, LokiLocalStorageAdapter, LokiFsAdapter } from 'lokijs';

export class ILokiFeature implements IFeatureQuery {
    variable_name!: string;
    query_value!: string;
    query_value_type!: QueryValueType;
    comparision_type!: QueryComparisionType;
    
    converting_to_query() : object {
        let query: {[key:string] : any} = {};

        if(!get_value_type(BackendDBEngine.LokiJS).includes(this.query_value_type)) {
            throw new Error("Unsupport QueryValueType for LokiJS DB, expecting STRING or NUMBER type value");
        }

        if(this.variable_name == "$document_id") this.variable_name = "$loki"; // LokiJS uid variable

        if(this.query_value_type == QueryValueType.STRING) {
            switch(this.comparision_type) {
                case QueryComparisionType.SIMILAR:
                    query["$aeq"] = this.query_value;
                    break;

                case QueryComparisionType.MATCH:
                    query["$regex"] = this.query_value;
                    break;

                case QueryComparisionType.CONTAINS:
                    query["$contains"] = this.query_value;
                    break;

                default:
                    throw new Error("Unsupported comparision type for STRING in LokiJS DB: " + this.comparision_type);
            }
        }

        if(this.query_value_type == QueryValueType.NUMBER) {
            let value = Number(this.query_value);
            switch(this.comparision_type) {
                case QueryComparisionType.EQUALS:
                    query["$aeq"] = value;
                    break;

                case QueryComparisionType.GREATER:
                    query["$gt"] = value;
                    break;

                case QueryComparisionType.LESS:
                    query["$lt"] = value;
                    break;

                case QueryComparisionType.GREATER_OR_EQUALS:
                    query["$gte"] = value;
                    break;

                case QueryComparisionType.LESS_OR_EQUALS:
                    query["$lte"] = value;
                    break;

                default:
                    throw new Error("Unspported comparision type for NUMBER in LokiJS DB: " + this.comparision_type);
            }
        }

        let obj: {[key:string] : object} = {};
        obj[this.variable_name] = query;
        return obj;
    };

    constructor(variable_name: string, query_value: string, query_value_type: string, comparision_type: string) {
        this.variable_name = variable_name;
        this.query_value = query_value;
        this.query_value_type = converting_string_to_enum_type<QueryValueType>(query_value_type, QueryValueType);
        this.comparision_type = converting_string_to_enum_type<QueryComparisionType>(comparision_type, QueryComparisionType);
    };
}


export class LokiJSDBInterface implements DatabaseInterface {
    private database! : Loki;
    private collection! : Collection;
    
    constructor() {
        this.database = new loki(process.env.LOKI_DB_NAME || "dev_mode.json", {
            autoload: true,
            autosave: true, 
            autosaveInterval: 100,
            adapter: new LokiFsAdapter(),
            verbose: true,
            autoloadCallback: () => {
                this.collection = this.database.getCollection(process.env.LOKI_COLLECTION_NAME || "dev_mode");
                if(this.collection == null) {
                    this.collection = this.database.addCollection(process.env.LOKI_COLLECTION_NAME || "dev_mode");
                }
            }
        });
        
        
    };

    query (queries: ILokiFeature[]): any[] {
        if(this.collection == undefined) throw new Error("Database loading, pls try later");
        let arr: object[] = queries.map(e => e.converting_to_query());
        let query : {[key:string] : object} = {};
        query["$and"] = arr;
        return this.collection.find(query);
    }

    query_and_cast<Target extends DataModel> (queries: ILokiFeature[]): Target[] {
        // @ts-ignore
        return this.query(queries).map(obj => {
            var temp = new UserReviewDataModel(obj.user_name, obj.email, obj.rating, obj.detail_review);
            Object.assign(temp, obj);
            return temp;
        })
    }

    add(data: DataModel[]): any {
        return this.collection.insert(data);
    };

    update(queries: ILokiFeature[], data: DataModel): any {
        var matched_doc = this.query(queries);
        if(matched_doc.length == 0) throw new Error("Threr isn't a document matched with the given features: " + queries);
        if(matched_doc.length > 1) throw new Error("Threr is more than 1 document matched with the given features: " + queries);

        return this.collection.update(data);
    }

    delete(queries: ILokiFeature[]): any {
        var matched_doc = this.query(queries);
        if(matched_doc.length == 0) throw new Error("Threr isn't a document matched with the given features: " + queries);
        if(matched_doc.length > 1) throw new Error("Threr is more than 1 document matched with the given features: " + queries);

        return this.collection.remove(matched_doc[0]);
    }

    creating_feature_query(variable_name: string, query_value: string, query_value_type: string, comparision_type: string): IFeatureQuery {
        return new ILokiFeature(variable_name, query_value, query_value_type, comparision_type);
    }
}