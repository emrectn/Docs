# Genel Notes

## Ssh Windows Pc

```bash
#change dns server to 8.8.8.8 so that the OpenSSH stuff can be downloaded
netsh interface ip set dns "Ethernet" static 8.8.8.8

#sleep for 60 s so that the DNS server has time to register
Start-Sleep -m 60

#check if OpenSSH is already installed or not
Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'

# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Check if OpenSSH is available
dism /Online /Get-Capabilities | findstr OpenSSH

# install the server and/or client features:
dism /Online /Add-Capability /CapabilityName:OpenSSH.Client~~~~0.0.1.0
dism /Online /Add-Capability /CapabilityName:OpenSSH.Server~~~~0.0.1.0

Install-Module -Force OpenSSHUtils

Repair-SshdHostKeyPermission -FilePath C:\Windows\System32\OpenSSH\ssh_host_ed25519_key

# start the ssh server daemon
Start-Service sshd

# This should return a Status of Running
Get-Service sshd

# add firewall rule to allow inbound and outbound traffic through port 22
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Service sshd -Enabled True -Direction Inbound -Protocol TCP -Action Allow -Profile Domain

```