export enum QueryComparisionType {
    //string
    SIMILAR = "SIMILAR", 
    MATCH = "MATCH", // regex
    START_WITH = "START_WITH",
    END_WITH = "END_WITH",
    CONTAINS = "CONTAINS",

    //numeric
    EQUALS = "EQUALS",
    GREATER = "GREATER",
    LESS = "LESS",
    GREATER_OR_EQUALS = "GREATER_OR_EQUALS",
    LESS_OR_EQUALS = "LESS_OR_EQUALS", 
}

export enum QueryValueType {
    // LokiJS
    NUMBER = "NUMBER",
    STRING = "STRING",

    // MySQL
    VARCHAR = "VARCHAR",
    INT = "INT",
    FLOAT = "FLOAT"
}

export enum BackendDBEngine {
    LokiJS = "LokiJS"
}

export function get_value_type(db_type: BackendDBEngine) : QueryValueType[] {
    switch(db_type) {
        case BackendDBEngine.LokiJS:
            return [QueryValueType.NUMBER, QueryValueType.STRING];
    
        default:
            throw new Error("Unsupport database");    
    }
}