import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log.apply(`supplying ${watts} worth of power`);
  }
}
