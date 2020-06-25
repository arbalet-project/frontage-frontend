export class StatusFacade {
  current_app: string;
  current_time: string;
  next_on_time: string;
  height: number;
  width: number;
  is_forced: boolean;
  is_usable: boolean;
  disabled: Array<Array<number>>
  state: string;
  version: string;
}
