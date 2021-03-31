let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');

let PROTO_PATH =  __dirname + '/hello.proto';
let PORT_TARGET = '0.0.0.0:5555';

let packageDefinition = protoLoader.loadSync(PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

let grpcPackageObject = grpc.loadPackageDefinition(packageDefinition).internalGrpc;

function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}

function main() {
    let server = new grpc.Server();

    server.addService(grpcPackageObject.GrpcService.service, {sayHello: sayHello});
    server.bindAsync(PORT_TARGET, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();
