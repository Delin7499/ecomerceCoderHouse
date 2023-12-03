kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

kubectl delete deployment deployment-name
delete service service-name

kubectl get deployment
kubectl get service

kubectl logs pod-name

docker push matimbarcelo/ecomercecoderhouse
docker build -t matimbarcelo/ecomercecoderhouse .
docker run -p 8080:8080 -d matimbarcelo/ecomercecoderhouse
