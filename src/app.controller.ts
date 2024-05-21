import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './new_order/index.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaProducer: OrderService) {}

  @Post('produce')
  async newOrder(@Body() body: { product: string; value: number }) {
    await this.kafkaProducer.connect();
    await this.kafkaProducer.produce('orders', JSON.stringify(body));
    await this.kafkaProducer.disconnect();
    return { success: true };
  }
}
