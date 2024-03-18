# SNPE Docker Installation

Dockerfile create a container to convert Onnx/Tensorflow to Tensorflow and run the model using Qualcomm SNPE tools

    - Ubuntu: 18.04
    - Snpe: 1.53.2

## Setup with DockerFile 1.53

```bash
# create a folder
mkdir snpe-docker
# create a Dockerfile and paste following
```

Dockerfile

```bash
FROM ubuntu:18.04

ENV LANG=C.UTF-8
ENV TZ=Europe/Istanbul
ENV DEBIAN_FRONTEND="noninteractive"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


RUN apt-get update && apt-get install -y \
    python \
    python3 \
    python3-pip \
    unzip \
    sudo \
    wget \
    apt-utils \
    zip \
    libc++-9-dev \
    python-sphinx \
    python3-scipy \
    python3-matplotlib \
    python3-skimage \
    python-protobuf \
    python3-mako \
    python3-dev \
    python-dev \
    adb \
    vim \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3.6 2 && \
    update-alternatives --config python

RUN pip3 install \
    numpy==1.16.5 \
    sphinx==2.2.1 \
    scipy==1.3.1 \
    matplotlib==3.0.3 \
    protobuf==3.8.0 \
    pillow==7.2.0 \
    scikit-image==0.15.0 \
    pyyaml==5.1 \
    mako==1.1.4 \
    onnx==1.6.0 \
    tensorflow==1.6.0

COPY snpe-1.53.2.zip /

WORKDIR /

RUN unzip snpe-1.53.2.zip



RUN /bin/bash -c "source snpe-1.53.2.2811/bin/dependencies.sh" && \
    /bin/bash -c "source snpe-1.53.2.2811/bin/check_python_depends.sh"

ENV SNPE_ROOT=/snpe-1.53.2.2811
ENV ONNX_HOME=/usr/local/lib/python3.6/dist-packages/onnx
ENV TENSORFLOW_HOME=/usr/local/lib/python3.6/dist-packages/tensorflow
ENV NDK_URL="https://dl.google.com/android/repository/android-ndk-r17c-linux-x86_64.zip"
ENV ANDROID_NDK=/opt/android-ndk-linux
ENV ANDROID_NDK_HOME=/opt/android-ndk-linux
RUN wget -q --output-document=android-ndk.zip $NDK_URL && \
    unzip android-ndk.zip && \
    rm -f android-ndk.zip && \
    mv android-ndk-r17c $ANDROID_NDK_HOME


RUN cd $SNPE_ROOT && \
    /bin/bash -c "source bin/envsetup.sh -o $ONNX_HOME"

# get directory of the bash script
ENV SOURCEDIR=/snpe-1.53.2.2811/bin
ENV SNPE_ROOT=/snpe-1.53.2.2811
ENV PATH=$SNPE_ROOT/bin/x86_64-linux-clang:$PATH

# setup LD_LIBRARY_PATH
ENV LD_LIBRARY_PATH=$SNPE_ROOT/lib/x86_64-linux-clang:$LD_LIBRARY_PATH
# setup PYTHONPATH
ENV PYTHONPATH=$SNPE_ROOT/lib/python:$PYTHONPATH
ENV PYTHONPATH=$SNPE_ROOT/models/lenet/scripts:$PYTHONPATH
ENV PYTHONPATH=$SNPE_ROOT/models/alexnet/scripts:$PYTHONPATH

#setup SNPE_UDO_ROOT
ENV SNPE_UDO_ROOT=$SNPE_ROOT/share/SnpeUdo/

CMD ["/bin/bash"]

```
Download [SNPE 1.53.2 SDK](https://developer.qualcomm.com/software/qualcomm-neural-processing-sdk/tools) and place in this folder. Note: You can change version of SDK version(1.53.2) but you must update version in Dockerfile.

Linux için
```bash
docker build -t snpe .
docker run -v "$(pwd)"/mount:/mnt/files --privileged -v /dev/bus/usb:/dev/bus/usb -it snpe
```

Windows için Powershell kullanılması gerekmektedir. Projenin bulunduğu dizine gidilir.
```bash
docker build -t snpe .
docker run -v $PWD/mount:/mnt/files --privileged -v /dev/bus/usb:/dev/bus/usb -it snpe
```

Structure should be as follows:

```bash
.
|-- snpe-docker
|   |-- mount
|   |-- Dockerfile
|   |-- snpe-1.53.2.zip
```


Note that the above command:

- Mounts the mount/ folder into /mnt/files in the container. This is to be able to access your models but also retrieve the results from snpe runs.
- Runs with priviledged mode and mounts /dev/bus/usb. This is to give the container visibility into adb devices connected via usb.

All the snpe binaries should be accessible (e.g., snpe-onnx-to-dlc, snpe-dlc-info, snpe-dlc-quantize, etc).


## Tensorflow to DLC Example
You can following documents.

## ONNX to DLC
First, the onnx model (named model.onnx) should be placed in the mount/ folder (i.e., mount/model.onnx).

Then, we included an helper script (run.sh) that basically runs the docker instance but also does a few more steps:

- Kill the local adb daemon - this is to ensure that adb devices are visible from within the container.
- Docker build - in case you missed the previous step.
- Docker run - this is the same as shown above, with the mount and priviledged properties.

To convert mount/model.onnx simply run:
```bash
./run.sh snpe-onnx-to-dlc -i /mnt/files/model.onnx
```

## Get DLC Info
Assuming the previous step was run and that it generated a model.dlc file in the local /mount/model.dlc, just run:

```bash
./run.sh snpe-dlc-info -i /mnt/files/model.dlc
```

Note that the path /mnt/files/model.dlc is the path to the model as seen by the container (i.e., the mounted volume).

## SNPE Tools
The SDK also provides the following command-line tools that developers can augment their ML pipelines with:

- **snpe-dlc-quantize**: quantizes a .dlc file to optimize its size.
- **snpe-dlc-info**: saves layer information to a .csv file.
- **snpe-dlc-diff**: saves the differences between two .dlc files to a .csv file.
- **snpe-dlc-viewer**: renders the network structure of a .dlc file in a browser.
- [View All Tools](https://developer.qualcomm.com/sites/default/files/docs/snpe/tools.html)


## Sources
- https://github.com/4knahs/snpe-docker
- https://github.com/rakelkar/snpe_convert
- [Tensorflow Inception V3 SNpe Tutorial](https://developer.qualcomm.com/sites/default/files/docs/snpe/tutorial_inceptionv3.html)
- [MobileNet](https://github.com/tensorflow/models/blob/master/research/slim/nets/mobilenet_v1.md)
- [OnnX AlexNet Model](https://github.com/onnx/models/tree/master/vision/classification/alexnet)
- [SNPE Install Without Docker](https://developer.qualcomm.com/sites/default/files/docs/snpe/setup.html)
