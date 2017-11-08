export interface FApp {
    name: string;
    playable: string;
    params_list: {
        uapp: string[];
    };
}

export interface FAppOptions {
    name: string;
    playable: string;
    params_list:any;
}