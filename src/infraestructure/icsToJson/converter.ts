import { icsToJson } from 'ics-to-json';
import { ICSConverter } from '../datasources/blackboard-calendar.datasource';
export const convert = icsToJson as ICSConverter;
