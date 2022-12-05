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

