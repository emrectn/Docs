## Nginx Conf


Main Conf

```bash

    worker_processes auto;
    events {
    worker_connections 2048;
    }

    error_log /turkcell/wsadmin/nginxAIPTEST/tmp/error.log;
    #error_log /turkcell/wsadmin/nginxAIPTEST/tmp/error.log notice;

    pid /turkcell/wsadmin/nginxAIPTEST/nginx.pid;

    http {
    keepalive_timeout 2500;
    client_max_body_size 24000M;

    send_timeout                10000m;
    client_header_timeout       10000m;
    client_body_timeout         10000m;

    large_client_header_buffers 8 1024k;

    server_tokens off;
    etag off;

    log_format xff '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /turkcell/wsadmin/nginxAIPTEST/tmp/access.log;
    include /turkcell/wsadmin/nginxBASE/conf/mime.types;
    default_type application/octet-stream;

    error_page 400 /err400.html;
    error_page 401 /err401.html;
    error_page 403 /err403.html;
    error_page 404 /err404.html;
    error_page 500 501 502 503 504 /err500.html;

    #include /turkcell/wsadmin/nginxAIPTEST/subConfs/multiple_backend_proxy.conf_AIPTEST;
    include /turkcell/wsadmin/nginxAIPTEST/subConfs/vhost.conf_AIPTEST;
    }

```

subConfs

```bash

{
  location /togg-demo/ {
    proxy_pass https://aiv-togg-demo-ai-vision.apps.tocpgt01.tcs.turkcell.tgc/;
    client_max_body_size 300M;
  }

  location /vision/head-pose/ {
    proxy_pass https://aiv-head-pose-ai-vision.apps.tocpgt01.tcs.turkcell.tgc/;
    client_max_body_size 300M;
  }

  location /edge/isgomsan {
    proxy_pass https://aihub-edge-http-ai-platform.apps.tocpgt01.tcs.turkcell.tgc/omsan_events;
    client_max_body_size 5000M;
  }

}

```

#### Nginx Rate Limit

https://www.digitalocean.com/community/tutorials/how-to-rate-limit-a-node-js-app-with-nginx-on-ubuntu-20-04