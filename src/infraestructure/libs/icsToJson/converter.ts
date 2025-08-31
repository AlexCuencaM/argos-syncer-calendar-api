import * as ical2json from 'ical2json'
import { ICSConverter, ICSConverter2Json } from '../../datasources/blackboard-calendar.datasource';
const convertToJson = (source:string) => {
    return ical2json.convert(source) as ICSConverter2Json;
}
export const convert = convertToJson as ICSConverter;

