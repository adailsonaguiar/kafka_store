import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer.service';
import { KafkaProducerService } from './kafka/producer.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [KafkaProducerService, ConsumerService],
})
export class AppModule {}
