import { Module } from '@nestjs/common';
import { FraudDetectorService } from './index.service';

@Module({
  providers: [FraudDetectorService],
  exports: [FraudDetectorService],
})
export class FraudDetectorModule {}
