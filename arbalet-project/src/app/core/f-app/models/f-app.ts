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
    position : number;
}

export interface CurrentFAppResponse {
    default_params: {
        name : string;
    };
    expire_at : string;
    expires : number;
    is_default : boolean;
    is_forced : boolean;
    is_scheduled : boolean;
    last_alive: number;
    name: string;
    params: {
        "uApp" : string; // TODO change to flags or another.
    };
    position : number;
    started_at : string;
    task_id : string;
    uniqid : string;
    userid: string;
    username: string;
}

// tslint:enable:variable-name