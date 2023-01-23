# Python Notes

## Save Format in Keras

It seems you already know some of the differences, but just to add.

#### .ckpt
This is mainly used for resuming the training and also to allow users to customize savepoints and load to (ie. Highest Accuracy, Latest Trained Model, etc).
And also to create different models from different training checkpoints.
This only saves the weights of the variables or the graph therefore as you indicated you need to have full architectures and functions used.

#### .pb (Protobuffer)
This is the TensorFlow file format which saves everything about the Model including custom objects, this is the recommended file format to ensure maximum portability when using and exporting to different platforms (ie. Tensorflow Lite, Tensorflow Serving, etc.).

#### .h5 (HD5F)
This is the suggested saving format of Native Keras, which also saves everything about the model but when used in TensorFlow 2.1.0 (import tensorflow.keras) it will not save the custom objects automatically and will require additional steps to be performed.

#### Source
- [Source 1](https://stackoverflow.com/questions/59887312/when-to-use-the-ckpt-vs-hdf5-vs-pb-file-extensions-in-tensorflow-model-saving)
- [Source 2](https://www.tensorflow.org/tutorials/keras/save_and_load#manually_save_weights)


## Understanding the parameters

For Dense Layers:
```bash
output_size * (input_size + 1) == number_parameters 
```

For Conv Layers:
```bash
output_channels * (input_channels * window_size + 1) == number_parameters
```
Consider following example,

```bash
model = Sequential([
Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
Conv2D(64, (3, 3), activation='relu'),
Conv2D(128, (3, 3), activation='relu'),
Dense(num_classes, activation='softmax')
])

model.summary()

_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_1 (Conv2D)            (None, 222, 222, 32)      896       
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 220, 220, 64)      18496     
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 218, 218, 128)     73856     
_________________________________________________________________
dense_9 (Dense)              (None, 218, 218, 10)      1290      
=================================================================
```

Calculating params,

```bash
assert 32 * (3 * (3*3) + 1) == 896
assert 64 * (32 * (3*3) + 1) == 18496
assert 128 * (64 * (3*3) + 1) == 73856
assert num_classes * (128 + 1) == 1290
```
Sources:
- [Source](https://stackoverflow.com/questions/36946671/keras-model-summary-result-understanding-the-of-parameters)