import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() {}

  longStringMaker(numberOfRepeats: number): string {
    if (0 < numberOfRepeats) {
      return 'x'.repeat(numberOfRepeats);
    } else {
      throw new Error(`Parameter can't be negative`);
    }
  }
}
