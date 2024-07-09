import { Body, Controller, Post } from '@nestjs/common';
import { KafkaProducerService } from './producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  @Post('produce')
  async newOrder(@Body() body: { product: string; value: number }) {
    await this.kafkaProducer.connect();

    const data = { ...body, id: new Date().getTime() };

    await this.kafkaProducer.produce('orders', JSON.stringify(data));
    await this.kafkaProducer.disconnect();
    return { success: true };
  }
}
