import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

const LIMIT_OF_DATA_PROCESS = 2;

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
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'orders', fromBeginning: true });

    await this.consumer.run({
      eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
        console.log(`Processing batch of ${batch.messages.length} messages`);

        for (
          let i = 0;
          i < Math.min(batch.messages.length, LIMIT_OF_DATA_PROCESS);
          i++
        ) {
          const message = batch.messages[i];
          console.log({
            partition: batch.partition,
            offset: message.offset,
            value: message.value.toString(),
          });

          resolveOffset(message.offset);
          await heartbeat();
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
