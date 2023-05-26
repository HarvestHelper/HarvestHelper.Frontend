# HarvestHelper Frontend

## To build the frontend
```powershell
npm install
```

## To run the frontend locally
```powershell
npm start
```

## Build the docker image
```powershell
$version="1.0.1"
$appname="harvesthelper"
docker build -t "$appname.azurecr.io/harvesthelper.frontend:$version" .
```

## Run the docker image
```powershell
docker run -it --rm -p 3000:80 --name frontend "$appname.azurecr.io/harvesthelper.frontend:$version"
```

## Publish the docker image
```powershell
az acr login --name $appname
docker push "$appname.azurecr.io/harvesthelper.frontend:$version"
```

## Install the Helm chart
```powershell
$namespace="frontend"
helm install frontend-client ./helm --create-namespace -n $namespace
```