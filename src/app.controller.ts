import { Controller } from '@nestjs/common';
import { KafkaConsumerService } from './consumer/consumer.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaConsumer: KafkaConsumerService) {}
}
