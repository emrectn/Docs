# Kubernetes Notes

## Genel

#### Labels & Selectors
- **Labels**: Bir object'i taglemek için, belirtmek için.
- **Selector**: `Label`'lanan object `spec` içinden çağrılır.

#### ReplicaSet
- Podların üstü olarak değerlendirilir.
- Podların çalışır olmasını garanti eder.
- Load balancing veya scaling için kullanılır.
- ! Tek pod ile de replicatset yapılır.
- ! Bir pod manuel olarak silinirse yenisi yaratılır

#### Deployment Strategy

Yeni bir release versiyonda sırayla devreye alımı sağlar.

- RollingUpdate
    - maxSurge: tek seferde yaratılacak pod sayısı (3'er - 3'er)
    - maxUnavailable: Rollout sırasında max down olabilecek pod sayısı (2şer-2şer podları devredışı bırak)
- Recreate: Tüm podlarını down edilip, hepsini aynı anda devreye alınır
- Blue/Gren: ?
- Canary: Her iki verison'da live. Yeni versiyona küçük bir mitar trafik verilir ve test edilir.
- A/B Testing: Çeşitli parametrelere göre yönlendirme (Safariden gelenleri şuna, chrome öbürüne)
- Shadow : ?

#### Services
Pod'a erişim gerekli ise servis yaratılmalıdır.
- Nodeport: Podların node dışından erişebilmesini sağlar. (Browser açıp IP:port ile erişirsin)
- ClusterIP: Podların sadece cluster içinden erişilmesini sağlar.
- Loadbalancer: Cloud providerlar load distrubition için kullanılır. (Dış dünyaya açan gatewaydir.)

-----
- targetPort: Containerin kendi çalıştığı port
- port: Servis mapping yaptığı, cluster-internalport
- nodePort: Node'un external network portudur.

#### Scheduling | Taint & Tolerations
**Taint**: Node'un hangi şartlarda pod schedule edebileceğini belirtir.

```bash
kubectl taint nodes node01 app=blue:NoSchedule
# server01'da olan ve etiketi egitim olmayan hepsini kaldırıyor. Kaçınmak isteniyorsa tolerant kullanılmalı
kubectl taint nodes server01 tur=egitim:NoExecute
```
Bir örnek üzerinden bahsedelim.

```bash
~ kubectl get pods -w
abc server01
def server02
qwe server02
wwz server01

~ kubectl taint nodes server01 tur=egitim:NoExecute
def server02
qwe server02

# server01 içindeki nodları kaldırdı
```

#### Logging | Monitoring
- Metrics server
- Prometheus
- ElasticsStack

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Monitor cpu and memory
kubectl top pods -A

```

#### HPA

```bash
HPA:

kubectl apply -f https://k8s.io/examples/application/php-apache.yaml

kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

kubectl get hpa


kubectl run -i \
    --tty load-generator \
    --rm --image=busybox \
    --restart=Never \
    -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"


kubectl get hpa php-apache -w


Delete HPA:

kubectl delete deployment.apps/php-apache service/php-apache horizontalpodautoscaler.autoscaling/php-apache
```

#### Application Lifecycle Management
Yeni bir deployment yaratip, image guncelleyelim ve rollout status, history ve rollback komutlari ile durumu gozlemleyelim.

```bash
kubectl set image deployment lab16-deployment nginx-deployment=nginx:1.23
kubectl rollout status deployment lab16-deployment

# Undo
kubectl rollout undo deployment lab16-deployment
```

#### Liveness & Readiness
**Liveness:** Bazi yazilimlar, cesitli hatalar ve problemler nedeniyle calismaz durumda kalabilirler. Boyle durumlarda recover etmenin tek sarti pod restart etmek olabilir.
Belirtilen sartlar saglanmiyorsa kubelet, pod’u restart eder.

**Readiness:** Bazen uygulamalar gecici sure olarak trafik al(a)maz durumda olabilirler. Bu durumda pod’u kill/restart etmek yerine beklemek tercih edilebillir. Belirtilen sart saglanmiyorsa kubelet pod uzerine trafik almaz.




## Commands
```bash

# Login Url
# https://oauth-openshift.apps.tocpgt01.tcs.turkcell.tgc/oauth/token/display

kubectl config current-context
kubectl -n kube-system edit configmap/coredns
kubectl get ns
kubectl -n kubernetes-dashboard get pods -o wide
kubectl -n kubernetes-dashboard get svc

kubectl create serviceaccount dashboard -n default

# Exec bash in pod
kubectl exec -i -t my-pod --container main-app -- /bin/bash

kubectl describe pods <<POD_NAME>>

# Rollout
kubectl rollout history deployment <<DEPLOYMENT_NAME>>
kubectl rollout undo deployment <<DEPLOYMENT_NAME>>

# Copy File from pod to local
kubectl get pods
kubectl cp POD_NAME:FILE_PATH ./

# Copy Folder from pod to local
kubectl rsync LOCAL_FOLDER_PATH POD_NAME:REMOTE_FOLDER_PATH

# To look pod logs
kubectl describe pod {{POD_NAME}}



```

#### Run a command in a shell

```bash
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo hello; sleep 10;done"]
```
Readiness -> Hazır mı ben trafik yollayım mı?
Liveness -> Ara, ara kontrol ve canlı mı ?

Gracefull shuttdown
    -   Term sinyalini yolladıktan sonra 10 bekler. 10 sn terminatingte kalırsa otomatik kill edilir.

-------------------------
#### To Look

Helm
    - Kubernetes package manager

Envoy
    - Gelen giden tüm trafiği izler ve gerekli rullar yazılabiliyor.

Istio
    -


