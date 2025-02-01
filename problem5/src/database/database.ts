import { QueryValueType, QueryComparisionType } from "../enum/enum";
import { DataModel } from "../model/DataModel";

export interface IFeatureQuery {
    variable_name: string;
    query_value: string;
    query_value_type: QueryValueType;
    comparision_type: QueryComparisionType;

    converting_to_query() : any;
}

export interface DatabaseInterface {
    query(query: IFeatureQuery[]): any[];
    query_and_cast<T extends DataModel> (query: IFeatureQuery[]): T[];
    add(data: {}[]): any;
    update(query: IFeatureQuery[], data: DataModel) : any;
    delete(query: IFeatureQuery[]) : any;

    creating_feature_query(variable_name: string, query_value: string, query_value_type: string, comparision_type: string): IFeatureQuery;
} 