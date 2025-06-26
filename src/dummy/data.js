export const dummyProjects = [
  {
    project_id: "1",
    project_name: "Basic NN",
    project_description: "Simple neural network with input and dense layer",
    export_date: "2025-05-20T10:00:00Z",
    nodes: [
      {
        id: 1,
        node_id: 1001,
        displayed_name: "Input Layer",
        node_name: "input_layer",
        message: "Input layer created",
        params: [{ shape: [28, 28, 1] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 1,
        location_x: 100,
        location_y: 200,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 1001 }],
        project: 1
      },
      {
        id: 2,
        node_id: 1002,
        displayed_name: "Dense Layer",
        node_name: "dense_layer",
        message: "Dense layer created",
        params: [{ units: 128 }, { activation: "relu" }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 2,
        location_x: 250,
        location_y: 200,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 1001 } }],
        output_ports: [{ name: "layer", nodeData: 1002 }],
        project: 1
      }
    ]
  },
  {
    project_id: "2",
    project_name: "Conv Model",
    project_description: "CNN with Conv2D and MaxPooling",
    export_date: "2025-05-21T11:00:00Z",
    nodes: [
      {
        id: 3,
        node_id: 2001,
        displayed_name: "Conv2D Layer",
        node_name: "conv2d_layer",
        message: "Conv2D layer created",
        params: [{ filters: 32 }, { kernel_size: [3, 3] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 3,
        location_x: 100,
        location_y: 300,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 2001 }],
        project: 2
      },
      {
        id: 4,
        node_id: 2002,
        displayed_name: "MaxPool Layer",
        node_name: "maxpool2d_layer",
        message: "MaxPooling2D layer created",
        params: [{ pool_size: [2, 2] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 4,
        location_x: 300,
        location_y: 300,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 2001 } }],
        output_ports: [{ name: "layer", nodeData: 2002 }],
        project: 2
      }
    ]
  },
  {
    project_id: "3",
    project_name: "Dropout Test",
    project_description: "Dropout in between dense layers",
    export_date: "2025-05-22T12:00:00Z",
    nodes: [
      {
        id: 5,
        node_id: 3001,
        displayed_name: "Dense Layer",
        node_name: "dense_layer",
        message: "Dense layer created",
        params: [{ units: 256 }, { activation: "relu" }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 5,
        location_x: 100,
        location_y: 400,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 3001 }],
        project: 3
      },
      {
        id: 6,
        node_id: 3002,
        displayed_name: "Dropout Layer",
        node_name: "dropout_layer",
        message: "Dropout layer created",
        params: [{ rate: 0.5 }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 6,
        location_x: 250,
        location_y: 400,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 3001 } }],
        output_ports: [{ name: "layer", nodeData: 3002 }],
        project: 3
      }
    ]
  },
  {
    project_id: "4",
    project_name: "Flatten Flow",
    project_description: "Flatten after convolutional layers",
    export_date: "2025-05-23T14:00:00Z",
    nodes: [
      {
        id: 7,
        node_id: 4001,
        displayed_name: "Conv2D Layer",
        node_name: "conv2d_layer",
        message: "Conv2D layer created",
        params: [{ filters: 64 }, { kernel_size: [3, 3] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 7,
        location_x: 100,
        location_y: 500,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 4001 }],
        project: 4
      },
      {
        id: 8,
        node_id: 4002,
        displayed_name: "Flatten Layer",
        node_name: "flatten_layer",
        message: "Flatten layer created",
        params: [],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 8,
        location_x: 250,
        location_y: 500,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 4001 } }],
        output_ports: [{ name: "layer", nodeData: 4002 }],
        project: 4
      }
    ]
  },
  {
    project_id: "5",
    project_name: "Sequential Test",
    project_description: "Using a full sequential model",
    export_date: "2025-05-24T16:00:00Z",
    nodes: [
      {
        id: 9,
        node_id: 5001,
        displayed_name: "Input Layer",
        node_name: "input_layer",
        message: "Input layer created",
        params: [{ shape: [32, 32, 3] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 9,
        location_x: 100,
        location_y: 600,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 5001 }],
        project: 5
      },
      {
        id: 10,
        node_id: 5002,
        displayed_name: "Sequential Model",
        node_name: "sequential_model",
        message: "Sequential model created",
        params: [],
        task: "neural_network",
        node_type: "nn_model",
        uid: 10,
        location_x: 250,
        location_y: 600,
        input_ports: [{ name: "layer", connectedNode: { name: "layer", nodeData: 5001 } }],
        output_ports: [{ name: "nn_model", nodeData: 5002 }],
        project: 5
      }
    ]
  },
  {
    project_id: "6",
    project_name: "Full CNN",
    project_description: "A full CNN structure with 6 layers",
    export_date: "2025-05-25T18:00:00Z",
    nodes: [
      {
        id: 11,
        node_id: 6001,
        displayed_name: "Input Layer",
        node_name: "input_layer",
        message: "Input layer created",
        params: [{ shape: [64, 64, 3] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 11,
        location_x: 100,
        location_y: 700,
        input_ports: [],
        output_ports: [{ name: "layer", nodeData: 6001 }],
        project: 6
      },
      {
        id: 12,
        node_id: 6002,
        displayed_name: "Conv2D Layer",
        node_name: "conv2d_layer",
        message: "Conv2D layer created",
        params: [{ filters: 16 }, { kernel_size: [3, 3] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 12,
        location_x: 250,
        location_y: 700,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 6001 } }],
        output_ports: [{ name: "layer", nodeData: 6002 }],
        project: 6
      },
      {
        id: 13,
        node_id: 6003,
        displayed_name: "MaxPool Layer",
        node_name: "maxpool2d_layer",
        message: "MaxPooling2D layer created",
        params: [{ pool_size: [2, 2] }],
        task: "neural_network",
        node_type: "nn_layer",
        uid: 13,
        location_x: 400,
        location_y: 700,
        input_ports: [{ name: "prev_node", connectedNode: { name: "layer", nodeData: 6002 } }],
        output_ports: [{ name: "layer", nodeData: 6003 }],
        project: 6
      }
    ]
  }
];

export const cnn_data = {
    "project_id": "37",
    "project_name": "ay",
    "project_description": "auto",
    "export_date": "2025-05-17T09:25:46.987540",
    "nodes": [
        {
            "id": 4595,
            "node_id": 1713752969184,
            "displayed_name": "Input Layer",
            "node_name": "input_layer",
            "message": "Input layer created",
            "params": [
                {
                    "shape": [
                        150,
                        150,
                        3
                    ]
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 56,
            "children": [],
            "parent": [],
            "location_x": 516.3638082475909,
            "location_y": 2798.739764583516,
            "input_ports": [],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713752969184
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4596,
            "node_id": 1713756015072,
            "displayed_name": "Conv2D Layer",
            "node_name": "conv2d_layer",
            "message": "Conv2D layer created",
            "params": [
                {
                    "filters": 32
                },
                {
                    "kernel_size": [
                        3,
                        3
                    ]
                },
                {
                    "strides": [
                        1,
                        1
                    ]
                },
                {
                    "padding": "valid"
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 57,
            "children": [
                1713752969184
            ],
            "parent": [],
            "location_x": 692.691909665341,
            "location_y": 2755.5500376012906,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713752969184
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713756015072
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4597,
            "node_id": 1713754594512,
            "displayed_name": "MaxPool2D Layer",
            "node_name": "maxpool2d_layer",
            "message": "MaxPooling2D layer created",
            "params": [
                {
                    "pool_size": [
                        2,
                        2
                    ]
                },
                {
                    "strides": [
                        2,
                        2
                    ]
                },
                {
                    "padding": "valid"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 58,
            "children": [
                1713756015072
            ],
            "parent": [],
            "location_x": 970.1864898761129,
            "location_y": 2795.9691407567166,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713756015072
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713754594512
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4598,
            "node_id": 1713755991520,
            "displayed_name": "Conv2D Layer",
            "node_name": "conv2d_layer",
            "message": "Conv2D layer created",
            "params": [
                {
                    "filters": 64
                },
                {
                    "kernel_size": [
                        3,
                        3
                    ]
                },
                {
                    "strides": [
                        1,
                        1
                    ]
                },
                {
                    "padding": "valid"
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 57,
            "children": [
                1713754594512
            ],
            "parent": [],
            "location_x": 1269.6189136750017,
            "location_y": 2756.446694195858,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713754594512
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713755991520
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4599,
            "node_id": 1713755995360,
            "displayed_name": "MaxPool2D Layer",
            "node_name": "maxpool2d_layer",
            "message": "MaxPooling2D layer created",
            "params": [
                {
                    "pool_size": [
                        2,
                        2
                    ]
                },
                {
                    "strides": [
                        2,
                        2
                    ]
                },
                {
                    "padding": "valid"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 58,
            "children": [
                1713755991520
            ],
            "parent": [],
            "location_x": 1550.265258382345,
            "location_y": 2754.2808326038794,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713755991520
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713755995360
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4600,
            "node_id": 1713756561504,
            "displayed_name": "Conv2D Layer",
            "node_name": "conv2d_layer",
            "message": "Conv2D layer created",
            "params": [
                {
                    "filters": 32
                },
                {
                    "kernel_size": [
                        3,
                        3
                    ]
                },
                {
                    "strides": [
                        1,
                        1
                    ]
                },
                {
                    "padding": "valid"
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 57,
            "children": [
                1713755995360
            ],
            "parent": [],
            "location_x": 1863.5579486996878,
            "location_y": 2804.210607842313,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713755995360
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713756561504
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4601,
            "node_id": 1713755995984,
            "displayed_name": "MaxPool2D Layer",
            "node_name": "maxpool2d_layer",
            "message": "MaxPooling2D layer created",
            "params": [
                {
                    "pool_size": [
                        2,
                        2
                    ]
                },
                {
                    "strides": [
                        2,
                        2
                    ]
                },
                {
                    "padding": "valid"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 58,
            "children": [
                1713756561504
            ],
            "parent": [],
            "location_x": 2149.3517159821063,
            "location_y": 2809.445918963205,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713756561504
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713755995984
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4602,
            "node_id": 1713764626224,
            "displayed_name": "Flatten Layer",
            "node_name": "flatten_layer",
            "message": "Flatten layer created",
            "params": [],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 59,
            "children": [
                1713755995984
            ],
            "parent": [],
            "location_x": 544.2287093520878,
            "location_y": 2940.448643832911,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713755995984
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713764626224
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4603,
            "node_id": 1713756557472,
            "displayed_name": "DropOut Layer",
            "node_name": "dropout_layer",
            "message": "Dropout layer created",
            "params": [
                {
                    "rate": 0.3
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 61,
            "children": [
                1713764626224
            ],
            "parent": [],
            "location_x": 829.7403412285352,
            "location_y": 2942.975779241747,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713764626224
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713756557472
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4604,
            "node_id": 1713755022848,
            "displayed_name": "Dense Layer",
            "node_name": "dense_layer",
            "message": "Dense layer created",
            "params": [
                {
                    "units": 512
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 60,
            "children": [
                1713756557472
            ],
            "parent": [],
            "location_x": 1179.048450341573,
            "location_y": 2947.3922755359276,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713756557472
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713755022848
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4605,
            "node_id": 1713756614784,
            "displayed_name": "Dense Layer",
            "node_name": "dense_layer",
            "message": "Dense layer created",
            "params": [
                {
                    "units": 256
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 60,
            "children": [
                1713755022848
            ],
            "parent": [],
            "location_x": 1499.3242042512284,
            "location_y": 2947.2112919311517,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713755022848
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713756614784
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4606,
            "node_id": 1713766836384,
            "displayed_name": "Dense Layer",
            "node_name": "dense_layer",
            "message": "Dense layer created",
            "params": [
                {
                    "units": 128
                },
                {
                    "activation": "relu"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 60,
            "children": [
                1713756614784
            ],
            "parent": [],
            "location_x": 1810.9597817943197,
            "location_y": 2944.7435481790994,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713756614784
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713766836384
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4607,
            "node_id": 1713766830720,
            "displayed_name": "Dense Layer",
            "node_name": "dense_layer",
            "message": "Dense layer created",
            "params": [
                {
                    "units": 6
                },
                {
                    "activation": "softmax"
                }
            ],
            "task": "neural_network",
            "node_type": "nn_layer",
            "uid": 60,
            "children": [
                1713766836384
            ],
            "parent": [],
            "location_x": 2124.781044881349,
            "location_y": 2948.1712759382885,
            "input_ports": [
                {
                    "name": "prev_node",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713766836384
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "layer",
                    "nodeData": 1713766830720
                }
            ],
            "project": 37,
            "node_data": null
        },
        {
            "id": 4608,
            "node_id": 1713755507600,
            "displayed_name": "Sequential Model",
            "node_name": "sequential_model",
            "message": "Sequential model created",
            "params": [],
            "task": "neural_network",
            "node_type": "nn_model",
            "uid": 62,
            "children": [],
            "parent": [],
            "location_x": 2389.979543571782,
            "location_y": 2946.4535891710416,
            "input_ports": [
                {
                    "name": "layer",
                    "connectedNode": {
                        "name": "layer",
                        "nodeData": 1713766830720
                    }
                }
            ],
            "output_ports": [
                {
                    "name": "nn_model",
                    "nodeData": 1713755507600
                }
            ],
            "project": 37,
            "node_data": null
        }
    ]
}