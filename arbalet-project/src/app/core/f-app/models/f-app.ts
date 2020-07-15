// tslint:disable:variable-name
export interface FlagParameters {
    flags: string[] | string;
}

export interface FApp {
    name: string;
    activated: boolean;
    playable: boolean;
    params_list: FlagParameters;
    scheduled: boolean;
}

export interface ResponseLaunch {
    keep_alive_delay: number;
    queued: boolean;
    remove_previous: boolean;
}

export interface PositionResponse {
    position : number
}
// tslint:enable:variable-name
