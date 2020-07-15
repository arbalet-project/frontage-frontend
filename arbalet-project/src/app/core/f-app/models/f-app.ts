// tslint:disable:variable-name
export interface FlagParameters {
    flags: string[] | string;
}

export class FApp {
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
// tslint:enable:variable-name
