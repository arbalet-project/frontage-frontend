// tslint:disable:variable-name
export interface Status {
  is_up: string;
  protocol_version: number;
}

export interface StatusFacade {
  current_app: string;
  current_time: string;
  next_on_time: string;
  height: number;
  width: number;
  is_forced: boolean;
  is_usable: boolean;
  disabled: Array<Array<number>>;
  state: string;
  version: string;
}
// tslint:enable:variable-name
