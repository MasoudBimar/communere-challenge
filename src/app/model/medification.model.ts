/* eslint-disable @typescript-eslint/no-inferrable-types */
export class MedicationModel {
  id!: string;
  medicationName!: string;
  dosage!: number;
  dosageUnit?: UnitEnum;
  day!: DayEnum[];
  frequency!: string[];;
  issueDate!: string;

  /**
   *
   */
  constructor() {
    // this.frequency = [];
  }
}

export enum UnitEnum {
  Capsules = "Capsules",
  Tables = 'Tables',
  Applications = 'Applications',
  Drops = 'Drops',
  Milligrams = 'Milligrams',
  Micrograms = 'Micrograms',
}

export enum DayEnum{
  Mon = 'Monday',
  Tue= 'Tuesday',
  Wed= 'Wednesday',
  Thu= 'Thursday',
  Fri= 'Friday',
  Sat= 'Saturday',
  Sun= 'Sunday',
  Everyday= 'Everyday',
}

// export class Frequency {
  // day?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'Everyday';
  // time?: string[];
// }

export class SelectItem {
  label: string = 'name';
  value: string = 'id';
}
