// tslint:disable:variable-name
export interface Launch {
    keep_alive_delay: number;
    queued: boolean;
    remove_previous: boolean;
}

export interface LaunchForced {
    forced: boolean;
    keep_alive_delay: number;
}

export interface Position {
    position: number;
}

export interface CurrentFApp {
    default_params: {
        name: string;
    };
    expire_at: string;
    expires: number;
    is_default: boolean;
    is_forced: boolean;
    is_scheduled: boolean;
    last_alive: number;
    name: string;
    params: {
        uapp: string; // TODO change to flags or another.
    };
    position: number;
    started_at: string;
    task_id: string;
    uniqid: string;
    userid: string;
    username: string;
}

export interface KeepAlive {
    keepAlive: boolean;
}

export interface ParametersStatus {
    done: boolean;
}
// tslint:enable:variable-name
