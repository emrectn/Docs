# Deployment Configration

## Nginx Test Server
````bash

# Change User
dzdo -iu wsadmin

# Server
yanbing01.turkcell.tgc

# Nginx Files
/turkcell/wsadmin/nginxAIPTEST/

# Restart Nginx conf
./exec/gracefulRestart-Nginx

````

## Update the Prometheus-ai config map and restart the pod.
- Integrate monitoring into your project.
- Verify that the /metrics endpoint is returning data.
- Ensure that the Prometheus dashboard is active for your service.
- Deploy the Grafana dashboard from a JSON file.
- Congratulations, you're done!

```bash
    # App name üzerinden filtreleme yapılıyor.
    self.app_name = app_name
    INFO.labels(app_name=self.app_name).set(1)
```


## Access DB from pods Terminal

```bash
    import psycopg2
    conn = psycopg2.connect(host="xx",port="5432",database="xx",user="xx",password="xx", connect_timeout=4)
    cursor = conn.cursor()
    cursor.execute("select * from sima_aihub.user")
    cursor.fetchall()
````

## LoadBalancer IP için
```bash
    Güvenlik -> LoadBalancer
	- AÇıklama: AIHUB Sİma SErvisi Test ortamı load balancer
	- Segment Tipi : DMZ
	- LB-Virtual IP: YOK
	- LB-Protokol: TCP
	- LB-PORT 443

	-LB Sunucu Bilgileri
		- Yeni EKLE
			- BağlıSunucu: Yanbing
			- Nginx subConf'tan bakalım 8043 seçildi.
````

## Adding hsts header
https://crashtest-security.com/enable-hsts/
