import { Module } from '@nestjs/common';
import { OrderService } from './index.service';

@Module({
  providers: [OrderService],
  exports: [OrderService],
})
export class KafkaModule {}
