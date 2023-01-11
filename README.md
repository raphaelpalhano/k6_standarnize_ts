# performance-test


## Execução

### Subir o grafana

**Subir o grafana e influxdb:** `docker-compose up -d influxdb grafana`

### Executar os testes

**Executando arquivo específico com cli:** `docker-compose run --rm k6-cli run //src//tests//api//sap//sponsors//sponsors_load.js`

**Executando vários arquivos:** `docker-compose up  sponsors_smoke sponsors_load sponsors_stress`


#### Ordem de execução

docker-compose up -d influxdb grafana

docker-compose up  sponsors_smoke sponsors_load sponsors_stress 

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

## Dash board

**URL**: `https://app.currents.dev/projects/T4Uq0n/runs`

## Entendendo como funciona o sorry-cypress

**URL**: `https://docs.sorry-cypress.dev/guide/get-started`

**Tutorial**: `https://www.youtube.com/watch?v=xyFe3QAK9IY&t=205s`