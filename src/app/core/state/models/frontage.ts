export interface Frontage {
    width: number;
    height: number;
    disabled: Array<Array<number>>;
    state: string;
    usable: boolean;
    forced: boolean;
    nextOnTime: string;
    currentApp: string;
    currentTime: string;
}
