export const rabbitConfig = 
  {
    "connection": {
        "name": "coeusrabbitmq",
        "user": process.env.RABBITMQ_USER,
        "pass": process.env.RABBITMQ_PASSWORD,
        "server": process.env.RABBITMQ_SERVER,
        "vhost": "/",
        "port":process.env.RABBITMQ_PORT,
        "heartbeat": 20,
        "replyQueue": false
    },
    "exchanges": [ 
      {
        "name": "device_event",
        "type": "fanout",
        "durable": true,
      },
      {
        "name": "device_state",
        "type": "fanout",
        "durable": true,
      }
    ],    
    "queues": [
      {
        "name": "portal_device_event",
        "vhost": "/",
        "durable": false,
        "autoDelete": true,
        "unique": "id",
        "arguments": {
          "x-message-ttl": 1000
        },
        "subscribe": true
      },
      {
        "name": "portal_device_state",
        "vhost": "/",
        "durable": false,
        "autoDelete": true,
        "unique": "id",
        "arguments": {
          "x-message-ttl": 1000
        },
        "subscribe": true
      },
    ],
    // binds exchanges and queues to one another
    "bindings": [
      {
        exchange: "device_event",
        target: "portal_device_event",
      }, {
        exchange: "device_state",
        target: "portal_device_state",
      }
    ]    
  };
