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

let grpcPackage = grpc.loadPackageDefinition(packageDefinition).internalGrpc;

function main() {
    let client = new grpcPackage.GrpcService(PORT_TARGET, grpc.credentials.createInsecure());
    let userName = 'Thanh Ryot';

    client.sayHello({name: userName}, function(err, response) {
        console.log('Greeting:', response.message);
    });
}
main();
