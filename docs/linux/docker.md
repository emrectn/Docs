# Docker

```bash
## Run multiple scripts in one docker
services:
  metric-aggregator:
    command: bash -c "python3 test/send_stats_data.py & disown && python3 app.py"
```

## Access host inside docker container
Use --net="host" in your docker run command, then localhost in your docker container will point to your docker host.