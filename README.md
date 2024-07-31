# TombeBackend App

For install app run this command:

1. install node.js
2. run yarn install
3. sh run.sh

# Backenf Tombe App:

Swagger docs at link: http://localhost:3001/api/

# Script download.py permette il download dei file

# K8s file

kubectl apply -f k8-templates/k8-config.yaml
kubectl apply -f k8-templates/k8-secret.yaml
kubectl apply -f k8-templates/k8-kafka.yaml
kubectl apply -f k8-templates/k8-api.yaml
kubectl apply -f k8-templates/k8-microservices.yaml
