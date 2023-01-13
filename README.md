# performance-test


## Execução

### Subir o grafana

**Subir o grafana e influxdb:** `docker-compose up -d influxdb grafana`

### Executar os testes

**Executando arquivo específico com cli:** `docker-compose run --rm k6-cli run //performance//tests//api//swapi//swapi_suite.js`

**Executando vários arquivos:** `docker-compose up swapi_immersion swapi_stress --abort-on-container-exit --exit-code-from swapi_immersion swapi_stress`



## Estrutura de pastas do framework de performance

### Constants

Será reservado para exportar as constantes utilizadas no testes, como URL e outras, para não precisar repetir o valor.

### Dashboards

São os arquivos json, ou, arquivos yaml que estruturam os gráficos no grafana, como, linhas, dashboards, métricas, cor, tamanho, etc.


### docs

Documentos de anotações relacionados aos testes de performance

### helper

Arquivos com funções auxiliares, como: `conectar ao banco para executar querys`, `Criar reports automaticos`

### tests

Estrutura as pastas de serviços, endpoint que serão testadas.

[api](`somente testes que fazem request direto no microsserviço`) -->  [sap](`nome do microsserviço`) --> [sponsors](`nome do endpoint`) --> [group](`dentro de cada arquivo de teste será separado por grupo de métodos HTTP POST/sponsors, GET/sponsors`)

## Install K6 in pipeline

~~~sh

apt-get update &&  apt-get install ca-certificates gnupg2 -y
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list
apt-get update
apt-get install k6

~~~

### Executando comando

~~~sh
k6 run dist/sponsors/load.test.js

~~~
