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


## Jenkins File

```bash
    @Library('DevOpsGenericLibrary') _

    def agentLabels = [
        default: 'tocpt2-openjdk11-mvn36',
        buildah: 'js-vm-linux-buildah',
        oc: 'devops-aias-js-maven-new'
    ]

    pipeline {
        agent {
            label "${agentLabels.default}"
        }

        options {
            timestamps()
            buildDiscarder(
                logRotator(numToKeepStr: '30')
            )
        }

        // parameters {
        // }

        stages {
            stage ("Prepare Environment"){
                steps{
                    script{
                        info = [:]

                        info.catalog = [
                            company: "turkcell",
                            applicationService: "ai-vision-analytics",
                            softwareModule: "aihub-sima-http"
                        ]

                        info.artifact = [
                            application: [
                                name: "aihub-sima-http"
                            ],
                            containerImage: [
                                name: "aihub-sima-http",
                                version: "0.1.0-${env.BUILD_ID}"
                            ]
                        ]

                        info.repository = [
                            containerImage: [
                                dev: "local-docker-dist-dev",
                                prod: "local-docker-dist-prod",
                                path: "com/turkcell/ai-vision-analytics",
                                host: "artifactory.turkcell.com.tr",
                            ]
                        ]

                        info.artifact.containerImage.imageTag =
                            "${info.repository.containerImage.host}/${info.repository.containerImage.dev}/${info.repository.containerImage.path}/${info.artifact.containerImage.name}:${info.artifact.containerImage.version}"

                        info.buildTools = [
                            buildah: [
                                root: "/data01/devops/data/buildah/data",
                                storage: "/data01/devops/data/buildah/storage",
                                ARG_PIPENV_PYPI_MIRROR: "https://artifactory.turkcell.com.tr/artifactory/api/pypi/virtual-pypi/simple"
                            ]
                        ]

                        info.deploymentTargets = [
                            openshift: [
                                test: [
                                    cluster: "tocpgt01",
                                    clientToken: "tocpgt01-ai-vision-jenkins",
                                    namespace: "ai-vision",
                                    templateParams: [
                                        image: [
                                            tag: info.artifact.containerImage.imageTag
                                        ],
                                        secrets: [
                                            simaPostgresPassword: [
                                                name: "aihub-sima-http.postgres-cario",
                                                key: "sima_aihub_app"
                                            ],
                                        ],
                                        postgres: [
                                            sima: [
                                                hostname: "cario.turkcell.tgc",
                                                port: "5432",
                                                databaseName: "sima_dev",
                                                applicationUser: "sima_aihub_app",
                                                defaultSchema: "sima_aihub"
                                            ],
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            }

            stage ("CI"){
                stages{
                    stage("Validations"){
                        steps{
                            echo "${info}"
                        }
                    }

                    stage("Build"){
                        stages{
                            stage("Build Container Image"){
                                agent {
                                    label "${agentLabels.buildah}"
                                }
                                when {
                                    anyOf {
                                        branch 'bootstrapping'
                                    }
                                }
                                steps{
                                    script{
                                        sh """
                                            buildah bud \
                                                --layers=true \
                                                --root ${info.buildTools.buildah.root} \
                                                --runroot ${info.buildTools.buildah.storage} \
                                                --build-arg ARG_PIPENV_PYPI_MIRROR=${info.buildTools.buildah.ARG_PIPENV_PYPI_MIRROR} \
                                                -t ${info.artifact.containerImage.imageTag} .
                                        """
                                    }
                                }
                            }
                        }
                    }

                    stage("Publish"){
                        stages{
                            stage("Publish Container Image to Artifactory"){
                                agent {
                                    label "${agentLabels.buildah}"
                                }
                                when {
                                    anyOf{
                                        branch 'bootstrapping'
                                    }
                                }
                                steps {
                                    script{
                                        withCredentials([usernamePassword(
                                                credentialsId: 'jenkins-aias-artifactory',
                                                usernameVariable: 'USERNAME',
                                                passwordVariable: 'PASSWORD')]) {
                                            sh """
                                                buildah login -u ${USERNAME} -p ${PASSWORD} ${info.repository.containerImage.host}
                                            """
                                            sh """
                                                buildah push \
                                                    --root ${info.buildTools.buildah.root} \
                                                    --runroot ${info.buildTools.buildah.storage} \
                                                    ${info.artifact.containerImage.imageTag}
                                            """
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            stage ("CD"){
                stages{
                    stage("Deploy"){
                        agent {
                            label "${agentLabels.oc}"
                        }
                        stages{
                            stage("Deploy to Openshift"){
                                when {
                                    anyOf{
                                        branch 'bootstrapping'
                                    }
                                }
                                steps {
                                    script {
                                        templateParams = info.deploymentTargets.openshift.test.templateParams

                                        openshiftTestClient {
                                            openshift.apply(
                                                openshift.process(
                                                    readFile('openshift/aihub-sima-http.yaml'),
                                                    "-p", "IMAGE_TAG_AIHUB_SIMA_HTTP=${templateParams.image.tag}",
                                                    "-p", "SECRET_NAME_AIHUB_SIMA_POSTGRES_PASSWORD=${templateParams.secrets.simaPostgresPassword.name}",
                                                    "-p", "SECRET_KEY_AIHUB_SIMA_POSTGRES_PASSWORD=${templateParams.secrets.simaPostgresPassword.key}",
                                                    "-p", "AIHUB_SIMA_HTTP_POSTGRES_HOSTNAME=${templateParams.postgres.sima.hostname}",
                                                    "-p", "AIHUB_SIMA_HTTP_POSTGRES_PORT=${templateParams.postgres.sima.port}",
                                                    "-p", "AIHUB_SIMA_HTTP_POSTGRES_DATABASE_NAME=${templateParams.postgres.sima.databaseName}",
                                                    "-p", "AIHUB_SIMA_HTTP_APPLICATION_USER=${templateParams.postgres.sima.applicationUser}",
                                                    "-p", "AIHUB_SIMA_HTTP_POSTGRES_DEFAULT_SCHEMA=${templateParams.postgres.sima.defaultSchema}",
                                                )
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    def openshiftTestClient(Closure body) {
            openshift.withCluster(info.deploymentTargets.openshift.test.cluster) {
                    openshift.withCredentials(info.deploymentTargets.openshift.test.clientToken) {
                            openshift.withProject(info.deploymentTargets.openshift.test.namespace) {
                                    body()
                            }
                    }
            }
    }

```

## Deployment Env

```bash
    ---
    apiVersion: template.openshift.io/v1
    kind: Template
    metadata:
    name: aihub-sima-http
    objects:
    -
    apiVersion: v1
    kind: ConfigMap
    metadata:
        name: aihub-sima-http-configuration
        namespace: ai-vision
    data:
        POSTGRES_SERVER: ${AIHUB_SIMA_HTTP_POSTGRES_HOSTNAME}
        POSTGRES_PORT: ${AIHUB_SIMA_HTTP_POSTGRES_PORT}
        POSTGRES_DB: ${AIHUB_SIMA_HTTP_POSTGRES_DATABASE_NAME}
        POSTGRES_USER: ${AIHUB_SIMA_HTTP_APPLICATION_USER}
        APP_SCHEMA: ${AIHUB_SIMA_HTTP_POSTGRES_DEFAULT_SCHEMA}

        blur_score_threshold: "1"
        image_brightness_max: "0.99"
        image_brightness_min: "0.01"

    -
    apiVersion: route.openshift.io/v1
    kind: Route
    metadata:
        name: aihub-sima-http
        namespace: ai-vision
    spec:
        path: /
        to:
        kind: Service
        name: aihub-sima-http
        port:
        targetPort: 8080
        tls:
        termination: edge
        insecureEdgeTerminationPolicy: Redirect
    -
    apiVersion: v1
    kind: Service
    metadata:
        name: aihub-sima-http
        namespace: ai-vision
    spec:
        selector:
        app: aihub-sima-http
        type: ClusterIP
        ports:
        - protocol: TCP
            port: 80
            targetPort: 8080
    -
    kind: DeploymentConfig
    apiVersion: apps.openshift.io/v1
    metadata:
        name: aihub-sima-http
        namespace: ai-vision
        labels:
        app: aihub-sima-http
    spec:
        replicas: 1
        selector:
        app: aihub-sima-http
        template:
        metadata:
            labels:
            app: aihub-sima-http
        spec:
            containers:
            -
                name: aihub-sima-http
                args:
                - '--workers=1'
                - '--threads=2'
                - '-k'
                - uvicorn.workers.UvicornWorker
                image: "${IMAGE_TAG_AIHUB_SIMA_HTTP}"
                resources:
                limits:
                    cpu: '2'
                    memory: 4000Mi
                requests:
                    cpu: 600m
                    memory: 1000Mi
                env:
                - name: POSTGRES_PASSWORD
                    valueFrom:
                    secretKeyRef:
                        name: ${SECRET_NAME_AIHUB_SIMA_POSTGRES_PASSWORD}
                        key: ${SECRET_KEY_AIHUB_SIMA_POSTGRES_PASSWORD}
                envFrom:
                - configMapRef:
                    name: aihub-sima-http-configuration
                ports:
                - containerPort: 8080
                    protocol: TCP
                volumeMounts:
                - name: generic
                mountPath: /data
                imagePullPolicy: IfNotPresent
                securityContext:
                allowPrivilegeEscalation: false
            restartPolicy: Always
            terminationGracePeriodSeconds: 30
            volumes:
            - name: generic
                persistentVolumeClaim:
                claimName: generic
    parameters:
    - name: IMAGE_TAG_AIHUB_SIMA_HTTP
    description: IMAGE_TAG_AIHUB_SIMA_HTTP
    value: ""
    required: true
    - name: SECRET_NAME_AIHUB_SIMA_POSTGRES_PASSWORD
    description: SECRET_NAME_AIHUB_SIMA_POSTGRES_PASSWORD
    value: ""
    required: true
    - name: SECRET_KEY_AIHUB_SIMA_POSTGRES_PASSWORD
    description: SECRET_KEY_AIHUB_SIMA_POSTGRES_PASSWORD
    value: ""
    required: true
    - name: AIHUB_SIMA_HTTP_POSTGRES_HOSTNAME
    description: AIHUB_SIMA_HTTP_POSTGRES_HOSTNAME
    value: ""
    required: true
    - name: AIHUB_SIMA_HTTP_POSTGRES_PORT
    description: AIHUB_SIMA_HTTP_POSTGRES_PORT
    value: ""
    required: true
    - name: AIHUB_SIMA_HTTP_POSTGRES_DATABASE_NAME
    description: AIHUB_SIMA_HTTP_POSTGRES_DATABASE_NAME
    value: ""
    required: true
    - name: AIHUB_SIMA_HTTP_APPLICATION_USER
    description: AIHUB_SIMA_HTTP_APPLICATION_USER
    value: ""
    required: true
    - name: AIHUB_SIMA_HTTP_POSTGRES_DEFAULT_SCHEMA
    description: AIHUB_SIMA_HTTP_POSTGRES_DEFAULT_SCHEMA
    value: ""
    required: true
```