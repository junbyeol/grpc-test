import {GreeterClient} from '../models/greeter';
import {credentials} from "@grpc/grpc-js";

const client = new GreeterClient(
  'localhost:50051',
  credentials.createInsecure()
);

client.sayHello({name: 'you'}, function(err, response) {
  console.log('Greeting:', response.message);
});

client.sayHelloAgain({name: 'you'}, function(err, response) {
  console.log('Greeting:', response.message);
});