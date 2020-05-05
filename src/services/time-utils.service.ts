import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeUtilsService {

    getBeginEndTimestampDisplayFormat(begin: string, end: string) {
        return `${begin} - ${end}`;
    }

    getUTCTimeDisplayFormat(milliseconds: number) {
        let date = new Date(milliseconds);
        let hourString = this.addZero(date.getUTCHours());
        let minuteString = this.addZero(date.getUTCMinutes());
        let secondString = this.addZero(date.getUTCSeconds());

        return `${hourString}:${minuteString}:${secondString}`;
    }

    addZero(digit: number) {
        return digit < 10 ? "0" + digit : digit;
    }
}