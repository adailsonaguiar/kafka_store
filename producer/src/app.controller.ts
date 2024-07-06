import { Body, Controller, Post } from '@nestjs/common';
import { KafkaProducerService } from './producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  @Post('produce')
  async newOrder(@Body() body: { product: string; value: number }) {
    await this.kafkaProducer.connect();
    await this.kafkaProducer.produce('orders', JSON.stringify(body));
    await this.kafkaProducer.disconnect();
    return { success: true };
  }
}
