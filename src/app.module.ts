import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './producer/kafka.module';
import { KafkaProducerService } from './producer/producer.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [KafkaProducerService],
})
export class AppModule {}
