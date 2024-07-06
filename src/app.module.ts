import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './consumer/kafka.module';
import { KafkaConsumerService } from './consumer/consumer.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [KafkaConsumerService],
})
export class AppModule {}
