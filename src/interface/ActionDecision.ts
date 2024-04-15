import {
  ActionDecisionEnum,
  ActionZoneEnum,
} from 'src/enums/ActionDecisionEnum';

export interface ActionWeight {
  [key: ActionZoneEnum | string]: ZoneField;
}

export interface ZoneField {
  Attack: ActionZone;
  Defense: ActionZone;
}

export interface ActionZone {
  [key: ActionDecisionEnum | string]: number;
}
