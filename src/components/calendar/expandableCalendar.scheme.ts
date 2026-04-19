import {  ExpandableCalendarProps } from "react-native-calendars";
export type ExactDayProps = React.ComponentProps<NonNullable<ExpandableCalendarProps['dayComponent']>>;
export enum DayState  {
    SELECTED = 'selected',
    TODAY = 'today',
    DISABLED = 'disabled',
    INACTIVE = 'inactive'
}