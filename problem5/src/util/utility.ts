import { QueryComparisionType } from "../enum/enum";

export function converting_string_to_enum_type<EnumType>(str: string, obj: object) : EnumType {
    str = str.toUpperCase();
    if((Object.values(obj) as Array<string>).includes(str)) return str as unknown as EnumType;
    throw new Error("Unsupported value for converting to QueryComparisionType: " + str);
}

