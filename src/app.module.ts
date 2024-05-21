import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './new_order/index.module';
import { OrderService } from './new_order/index.service';
import { FraudDetectorService } from './fraud_detector/index.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [OrderService, FraudDetectorService],
})
export class AppModule {}
