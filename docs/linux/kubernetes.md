# Kubernetes Notes

## Commands
```bash

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


