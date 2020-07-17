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

// tslint:enable:variable-name
