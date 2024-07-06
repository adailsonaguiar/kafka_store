import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async produce(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
