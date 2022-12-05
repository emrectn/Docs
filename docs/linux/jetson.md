# Jetson Notes

## Jetson Notes

pip9.exceptions.InstallationError: Command "python setup.py egg_info" failed with error code 1 in /tmp/tmpoons7qgkbuild/opencv-python/

```bash
# Debug docker con
sudo python3 -m pip install -U pip
sudo python3 -m pip install -U setuptools
```


#### Docker-compose installation
```bash
sudo apt install python3-pip

sudo apt-get install -y libffi-dev
sudo apt-get install -y python-openssl
sudo apt-get install libssl-dev

sudo pip3 install docker-compose
```


### Nvidia runtime-configuration
```bash

{
    # data-root path
    "data-root": "/media/nvidia/SD_EXTERNAL1/mnt/docker/",
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    }
}

```