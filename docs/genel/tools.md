# Genel Notes

## Vscode Remote Vsl Error

```bash
[15:52:30.872] Remote command length: 6205/8192 characters
[15:52:30.873] Running script with connection command: ssh -T -D 54423 "192.168.1.110" powershell
[15:52:30.886] Terminal shell path: C:\WINDOWS\System32\cmd.exe
[15:52:31.557] > ]0;C:\WINDOWS\System32\cmd.exe
[15:52:31.558] Got some output, clearing connection timeout
[15:52:31.765] > emre@192.168.1.110's password:
[15:52:31.766] Showing password prompt
[15:52:35.620] Got password response
[15:52:35.620] "install" wrote data to terminal: "*"
[15:52:35.640] >
[15:52:36.180] > bash: powershell: command not found
[15:52:37.465] "install" terminal command done
[15:52:37.465] Install terminal quit with output: bash: powershell: command not found
[15:52:37.465] Received install output: bash: powershell: command not found
[15:52:37.467] Failed to parse remote port from server output
[15:52:37.467] Resolver error: Error:
	at Function.Create (c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:585222)
	at Object.t.handleInstallOutput (c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:583874)
	at Object.t.tryInstall (c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:681023)
	at processTicksAndRejections (node:internal/process/task_queues:96:5)
	at async c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:643908
	at async Object.t.withShowDetailsEvent (c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:647224)
	at async Object.t.resolve (c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:644958)
	at async c:\Users\tcemcetin\.vscode\extensions\ms-vscode-remote.remote-ssh-0.84.0\out\extension.js:1:727082
[15:52:37.486] ------

```

Open Settings
Find Remote.Ssh: Remote Platform
Change Windows to Linux


```bash
[09:05:27.044] Failed to parse remote port from server output
[09:05:27.044] Resolver error: Error:
	at Function.Create (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:64641)
	at Object.t.handleInstallOutput (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:63284)
	at Object.e [as tryInstallWithLocalServer] (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:386419)
	at processTicksAndRejections (internal/process/task_queues.js:93:5)
	at async /Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:294035
	at async Object.t.withShowDetailsEvent (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:405329)
	at async /Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:384890
	at async E (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:381658)
	at async Object.t.resolveWithLocalServer (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:384517)
	at async Object.t.resolve (/Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:1:295505)
	at async /Users/ben.kemp/.vscode/extensions/ms-vscode-remote.remote-ssh-0.65.4/out/extension.js:127:110530
[09:05:27.048] ------

```

Then a good solution that can work is: to connect to your server through terminal (vscode terminal, gnome-terminal, whatever)! Then go and remove /Home//.vscode-server


## Pycharm Erros

```bash

ssh://donbeo@149.157.140.205:22/usr/bin/python3 -u /Users/donbeo/Documents/phd_code/prova.py
bash: line 0: cd: /Users/donbeo/Documents/phd_code: No such file or directory
/usr/bin/python3: can't open file '/Users/donbeo/Documents/phd_code/prova.py': [Errno 2] No such file or directory

Process finished with exit code 2

```

https://stackoverflow.com/questions/34359415/pycharm-ssh-interpter-no-such-file-or-directory

--------------------------------------------------------

Cannot find declaration to go
Solution: RightClick training file -> Mark as source root

-------------------------------------------------------

## Docker2Podman in PowerShell

doskey docker=podman #In command prompt
Set-Alias -Name docker -Value podman # in powershell prompt

## Pycharm 
“Python exited with error code: <139>, message:<>”
https://stackoverflow.com/questions/45016449/pycharm-debugger-instantly-exits-with-139-code