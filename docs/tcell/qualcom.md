# Qualcom Installation

Qualcom installation guide
    - ADB Connection IP: 192.168.1.3
    - QNX Connection IP: 192.168.1.4
  
## Fast Connect From IP
Connect Android Debug Bridge with IP

```bash
adb start-server
adb connect 192.168.1.3
adb tcpip 5555
adb root
adb shell
```

Connect Qnx from Putty
```bash
ssh root@192.168.1.4
```

## Adb Connect 
First step adb installation. You can adb installation following [link](https://www.xda-developers.com/install-adb-windows-macos-linux/).

**Source List:**
- [Qualcom](https://developer.qualcomm.com/qualcomm-robotics-kit/learning-resources/setting-up-adb-wifi)

```bash
# Device list - Verify that a device is detected
adb devices

# To attach adb
adb root
adb shell

# Use adb wirelessly - Device ip considered as 192.168.1.54
adb tcpip 5555
adb connect 192.168.1.3

# To kill/start server
adb kill-server
adb start-server

```
## Define static ip configuration to ADB
```bash

# Attach adb terminal, you should kill server before doing this configuration
adb root
adb shell

# To show ip addr argumants 
ip addr help

# To set up an IP adress you can use
# ip addr add <IP_ADRESS> dev <Ethernet type>
ip addr add 192.168.1.27 dev eth0

# Long form
# ip addr add <IP_ADRESS> broadcast <BRODCAST_IP> dev <Ethernet type>
ip addr add 192.168.1.27/24 broadcast 192.168.1.255  dev eth0 

# Look up current config 
ip addr show

# Delete an IP adrees
# ip addr dele <IP_ADRESS> dev <Ethernet type>
ip addr del 192.168.1.27 dev eth0

```

## Define static ip configuration to Qnx
modify /scripts/startup.sh and add following line

```bash
ifconfig emac0 192.168.1.4 netmask 255.255.255.0 up
```

## Qnx Attach on Serial Port Using MicroUart Cable
Qnx installation link

- [Youtube Video](https://www.youtube.com/watch?v=y42V_7ZTa-s&ab_channel=ResearchComputingServices%2CCarletonUniversity)
- Check Uart Bridge- SerialPort connection from Device Manager
  - ![img](/togg/device_manager.png)
- Connect to Qnx via serial port using Putty
  - ![img](/togg/putty_serial.jpg)

## Run Inception Model on Adb

#### Select Architecture
```bash
# architecture: armeabi-v7a - compiler: clang - STL: libc++
export SNPE_TARGET_ARCH=arm-android-clang6.0
export SNPE_TARGET_STL=libc++_shared.so

# I choosed arm64 beacuse of Özsel
# architecture: arm64-v8a - compiler: clang - STL: libc++
export SNPE_TARGET_ARCH=aarch64-android-clang6.0
export SNPE_TARGET_STL=libc++_shared.so
```

#### Run on Docker Machine - Choice of target runtime

Depending on the chosen runtime the script may perform additional steps of optimization specific to a hardware target. Users can choose to generate the final DLC to run on one of CPU, GPU, DSP or the HTA targets at runtime. We will transfer the DLCs created by this script to the android. 

```bash
python $SNPE_ROOT/models/inception_v3/scripts/setup_inceptionv3.py -a ~/tmpdir -d
python $SNPE_ROOT/models/inception_v3/scripts/setup_inceptionv3.py -a ~/tmpdir -d -r dsp
python $SNPE_ROOT/models/inception_v3/scripts/setup_inceptionv3.py -a ~/tmpdir -r aip
python $SNPE_ROOT/models/inception_v3/scripts/setup_inceptionv3.py -a ~/tmpdir -r gpu
```

#### Run on Host Machine
Push SNPE libraries and the prebuilt snpe-net-run executable to /data/local/tmp/snpeexample on the Android target.
```bash
adb shell "mkdir -p /data/local/tmp/snpeexample/arm-android-clang6.0/bin"
adb shell "mkdir -p /data/local/tmp/snpeexample/arm-android-clang6.0/lib"
adb shell "mkdir -p /data/local/tmp/snpeexample/dsp/lib/"

adb push snpe/lib/arm-android-clang6.0/libc++_shared.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/

# /data/local/tmp/snpeexample/arm-android-clang6.0/lib
adb push snpe/lib/arm-android-clang6.0/libc++_shared.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libcalculator.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libcalculator_htp.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libhta.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libPlatformValidatorShared.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libSNPE.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libsnpe_dsp_domains_v2.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/
adb push snpe/lib/arm-android-clang6.0/libsnpe_dsp_domains_v3.so /data/local/tmp/snpeexample/arm-android-clang6.0/lib/

# /data/local/tmp/snpeexample/dsp/lib/
adb push snpe/lib/dsp/libcalculator_skel.so /data/local/tmp/snpeexample/dsp/lib/
adb push snpe/lib/dsp/libsnpe_dsp_v65_domains_v2_skel.so /data/local/tmp/snpeexample/dsp/lib/
adb push snpe/lib/dsp/libsnpe_dsp_v66_domains_v2_skel.so /data/local/tmp/snpeexample/dsp/lib/
adb push snpe/lib/dsp/libsnpe_dsp_v68_domains_v3_skel.so /data/local/tmp/snpeexample/dsp/lib/

# /data/local/tmp/snpeexample/arm-android-clang6.0/bin/
adb push snpe/bin/arm-android-clang6.0/snpe-net-run /data/local/tmp/snpeexample/arm-android-clang6.0/bin/


```
#### Set up enviroment variables

Set up the library path, the path variable, and the target architecture in adb shell to run the executable with the -h argument to see its description.

```bash
adb shell
export SNPE_TARGET_ARCH=arm-android-clang6.0
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/data/local/tmp/snpeexample/$SNPE_TARGET_ARCH/lib
export PATH=$PATH:/data/local/tmp/snpeexample/$SNPE_TARGET_ARCH/bin
export ADSP_LIBRARY_PATH="/data/local/tmp/snpeexample/dsp/lib;/system/lib/rfsa/adsp;/system/vendor/lib/rfsa/adsp;/dsp"

# To test
snpe-net-run -h
exit
```

#### Push model data to Android target

cd $SNPE_ROOT/models/inception_v3
mkdir data/rawfiles && cp data/cropped/*.raw data/rawfiles/
adb shell "mkdir -p /data/local/tmp/inception_v3"
adb push data/rawfiles /data/local/tmp/inception_v3/cropped
adb push data/target_raw_list.txt /data/local/tmp/inception_v3/
adb push dlc/inception_v3_quantized.dlc /data/local/tmp/inception_v3/

#### Running on Android using Runtime
```bash
snpe-net-run --container inception_v3_quantized.dlc --input_list target_raw_list.txt
snpe-net-run --container inception_v3_quantized.dlc --input_list target_raw_list.txt --use_dsp
snpe-net-run --container inception_v3_quantized.dlc --input_list target_raw_list.txt --use_aip
```
#### Show Result

```bash
# Pull the output into an output_android_aip directory.
adb pull /data/local/tmp/inception_v3/output output_android_aip
# Check the classification results by running the following python script:
python show_inceptionv3_classifications.py -i data\cropped\raw_list.txt -o output_android -l data\imagenet_slim_labels.txt
```

###### Source
- [TensorFlow Inception V3](https://developer.qualcomm.com/sites/default/files/docs/snpe/tutorial_inceptionv3.html)
- [Getting Inception V3](https://developer.qualcomm.com/sites/default/files/docs/snpe/tutorial_setup.html#tutorial_setup_inception_v3)


