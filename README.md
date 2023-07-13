# performance-test


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

[api](`somente testes que fazem request direto no microsserviço`) -->

[sponsors](`nome do microsserviço`) -->

[payables](`nome do endpoint`) --> 

[group](`dentro de cada arquivo de teste será separado por grupo de métodos HTTP POST/sponsors, GET/sponsors`)


### Nome dos arquivos de testes e build

[Service]_[tipo_de_teste].test.js


## Execução Local

## Subir o grafana

**Subir o grafana e influxdb:** `docker-compose up -d influxdb grafana`

## Build

docker build -t k6-tests:latest -f docker/dockerfile .

### Executar os testes local via docker

**Executando arquivo específico com cli:** `docker-compose run --rm k6-cli run //src//tests//api//sap//sponsors//sponsors_load.test.js`

**Executando vários arquivos:** `docker-compose up sponsors_smoke sponsors_load sponsors_stress`

### Executando testes via cli Local

~~~sh
k6 run dist/sponsors/payables_load.test.js

~~~

#### Ordem de execução local

docker-compose up -d influxdb grafana

docker-compose up  sponsors_smoke sponsors_load sponsors_stress 



## Executando na cloud

### Build

docker build -t k6-tests:latest -f docker/dockerfile .


### test

docker run -t k6-tests:latest run --env ENVIRONMENT=NONPROD dist\load-people.test.js


## api

https://swapi.dev/

## Other template

https://github.com/grafana/k6-template-typescript/blob/main/package.json