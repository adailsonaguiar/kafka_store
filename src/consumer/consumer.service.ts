import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'my-group' });
  }

  async onModuleInit() {
    console.log('[KafkaConsumerService] Initialize KafkaConsumerService');
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'orders', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  }

  async onModuleDestroy() {
    console.log('[KafkaConsumerService] Ending --- KafkaConsumerService');

    await this.consumer.disconnect();
  }
}
