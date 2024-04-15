import moment from 'moment';

export class DateHelper {
  static formatDate(date: string, format: string) {
    moment.locale('pt-br');
    const momentDate = moment(date);
    return momentDate.format(format);
  }
}
