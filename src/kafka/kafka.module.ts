import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { KafkaProducerService } from './producer.service';

@Module({
  providers: [ConsumerService, KafkaProducerService],
  exports: [ConsumerService, KafkaProducerService],
})
export class KafkaModule {}
