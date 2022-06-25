import {Server, sendUnaryData, ServerUnaryCall, UntypedHandleCall, ServerCredentials} from '@grpc/grpc-js';
import * as models from '../models/greeter';
import {GreeterService, HelloReply, HelloRequest} from "../models/greeter";

class Greeter implements models.GreeterServer {
  [name: string]: UntypedHandleCall;

  sayHello(call: ServerUnaryCall<HelloRequest, HelloReply>, callback: sendUnaryData<HelloReply>): void {
    console.log("Server Hello!");
    callback(null, HelloReply.fromJSON({ message: 'Hello ' + call.request.name }));
  }

  sayHelloAgain(call: ServerUnaryCall<HelloRequest, HelloReply>, callback: sendUnaryData<HelloReply>): void {
    console.log("Server Hello Again!");
    callback(null, HelloReply.fromJSON({ message: 'Hello again, ' + call.request.name }));
  }
}

const server = new Server();

server.addService(GreeterService, new Greeter());
server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
  server.start();
});