# Jetson Installation

## Require Scripts

```bash
# Check Jetpack/cudnn/Cuda version
head -n 1 /etc/nv_tegra_release
dpkg -l | grep -i nvidia-l4t
dpkg -l | grep -i jetpack
# Activate cpu core
sudo su
echo 1 > /sys/devices/system/cpu/cpu1/online

```
## Docker Default Runtime

To enable access to the CUDA compiler (nvcc) during ``docker build`` operations, add ``"default-runtime": "nvidia"`` to your ``/etc/docker/daemon.json`` configuration file before attempting to build the containers:

```bash
{
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    },

    "default-runtime": "nvidia"
}
```

You will then want to restart the Docker service or reboot your system before proceeding.

##### Sources
- https://ngc.nvidia.com/catalog/containers/nvidia:l4t-tensorflow

## Ros Installation
```bash

# Create workspace
mkdir -p TestWorksSpace/src

# Let's create and build a catkin workspace:
mkdir -p ~/{{WorkspaceName}}/src
cd ~/{{WorkspaceName}}/
catkin_make

# You should have created this in the Creating a Workspace Tutorial
cd ~/catkin_ws/src
catkin_create_pkg {{PackageName}} std_msgs rospy roscpp

# Source Project to run
source devel/setup.bash

# You should give execution mode to node
chmod +x {{node.py}}
```

```bash
# Ros Command List
rostopic list
rostopic info emre
```

#### Writing a Simple Publisher and Subscriber
[This tutorial](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28python%29) covers how to write a publisher and subscriber node in python. 