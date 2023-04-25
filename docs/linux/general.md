# Linux Notes

## Docker Notes


```bash
# Debug docker container
docker run -ti aiv-tim-analytics_test-emotion bash
```

docker: Error response from daemon: failed to create shim: OCI runtime create failed: container_linux.go:380: starting container process caused: error adding seccomp filter rule for syscall clone3: permission denied: unknown.
```bash
wget  https://launchpad.net/ubuntu/+source/docker.io/20.10.2-0ubuntu1~18.04.2/+build/21335731/+files/docker.io_20.10.2-0ubuntu1~18.04.2_arm64.deb
sudo dpkg -i docker.io_20.10.2-0ubuntu1~18.04.2_arm64.deb
```

Docker can not use gpu
```
Normally it would get installed by SDK Manager. These are the Docker-related packages that get installed:

$ sudo dpkg-query -l | grep nvidia

ii  libnvidia-container-tools                     0.9.0~beta.1                                     arm64        NVIDIA container runtime library (command-line tools)
ii  libnvidia-container0:arm64                    0.9.0~beta.1                                     arm64        NVIDIA container runtime library
ii  nvidia-container-csv-cuda                     10.2.89-1                                        arm64        Jetpack CUDA CSV file
ii  nvidia-container-csv-cudnn                    8.0.0.180-1+cuda10.2                             arm64        Jetpack CUDNN CSV file
ii  nvidia-container-csv-tensorrt                 7.1.3.0-1+cuda10.2                               arm64        Jetpack TensorRT CSV file
ii  nvidia-container-csv-visionworks              1.6.0.501                                        arm64        Jetpack VisionWorks CSV file
ii  nvidia-container-runtime                      3.1.0-1                                          arm64        NVIDIA container runtime
ii  nvidia-container-toolkit                      1.0.1-1                                          arm64        NVIDIA container runtime hook
ii  nvidia-docker2
So you could try installing those packages manually. This list above was gathered from JetPack 4.5.
```
https://forums.developer.nvidia.com/t/docker-runtime-to-access-the-gpu-jetson-nx/173189/9


## Linux Notes

Start jupyter notebook
```bash
jupyter notebook --no-browser --port=9996 --ip='*'
```

Load env from .env
```bash
#!/usr/bin/env bash

set -a
source config.env
set +a

python3 test.py
sed -i 's/\r$//' {filename}
```

IP scanner
```
sudo apt install nmap
nmap -sn -n -v --open 192.168.1.0/24
# Acik portları öğrenme
nmap -Pn -sS -n -v --reason --open 192.168.1.169
```

Find size
```bash
du -hs .[^.]*
```

ls but ignore "*"
```bash
ls -lhrt --ignore="*.jpg" --ignore="*.png"
```

conunt file
```bash
ls | wc -l
````

Detail for process
```bash
ps -ef | grep <id>
```

Find which process is using port
lsof -i -P | grep LISTEN | grep :8081
lsof -nP -i4TCP:$PORT | grep LISTEN

#### Create your own script in bash with arguments

```bash

#!/bin/bash
ke () {
  kubectl exec -it $1 bash
}

```


#### Load Env
```bash

ENV_FILE="$1"
CMD=${@:2}

set -o allexport
source $ENV_FILE
set +o allexport

$CMD

```

#### Benchmark to website
```bash
ab -c 100 -n 100 https://login.your_domain.com/
```
