# Smart Room

A Smart Room é um projeto que se propõe a criar salas inteligentes nas quais será possível monitorização de vários aspetos que vão desde o controlo de acessos às salas, níveis de temperatura a medições CO2 e humidade.

Aliado a uma dashboard todos os dados podem ser analisados em gráficos intuitivos que permitem melhor compreender o que se passa na sala, além disso será possível definir algumas preferências do utilizador em relação ao ambiente, podendo personalizar que alertas quer receber, bem como definir que acessos podem ser realizados na sala uma vez que será possível gerir quais os cartões autorizados ou não.

## Autores
* **Team Manager**  - [Rui Coelho](https://github.com/user-cube)
* **Product Owner**  - [Jean Brito](https://github.com/JoelBrito13)
* **Architect** - [Luís Costa](https://github.com/lmcosta98)
* **DevOps master** - [Pedro Candoso](https://github.com/PBCandoso)

## Repositórios de referência:
* [Sensores](https://github.com/user-cube/Smart_Room)
* [Frontend](https://github.com/user-cube/ies_frontend)
* [Backend](https://github.com/user-cube/ies_api)
* [NFC Controller](https://github.com/user-cube/door_control_center)

## Justificação da utilização de vários repositórios
Tal como foi definido na arquitetura do projeto, dissemos que íamos criar uma pwa baseada na aplicação web, para a criação de uma pwa, a Google exige:
* Seja acessível nos seus servidores de criação
* Esteja em HTTPS
* Quando feita em react usar a versão `production build`

Para que isto seja feito, um container na VM que nos foi fornecida não permite que a mesma seja criada. De modo a alcançar estes requisitos colocamos todo o nosso código no Heroku, assim, podemos fazer deploy do mesmo lá fornecendo os serviços que precisamos.
Dado as especificidade do Heroku, o deploy é mais rápido e simples quando o código se encontra em repositórios separados, dái termos tantos repositórios.

### CI/CD
Existem mecanismos de CI/CD implementados.
No que diz respeito a CI, foi feito integração com o Github Actions que trata de todo o processo de CI.
O CD ficou a cargo do Heroku que, após o Github Actions dar um parecer positivo, inicia o seu processo de deployment.

### Cloud AMQP
Uma vez que colocamos todos os serviços fora da UA, tivemos de recorrer ao alojamento do rabbit também fora da UA, para isso usamos a Cloud AMQP serviço fornecido pelos criadores do RabbitMQ.

### Mongo Atlas
Da mesma forma que tivemos de colocar o Rabbit fora da UA, fizemos o mesmo com o MongoDB, passando assim o Mongo para o Mongo Atlas serviço fornecido pelos criadores do mesmo..

### Deploy
Como foi mencionado anteriormente, colocamos tudo fora da UA, deste modo os serviços podem acedidos em:
* **Frontend** - [Heroku](https://iesfrontend.herokuapp.com/)
* **SpringBoot** - [Heroku](https://iesapi.herokuapp.com/)
* **Flask API** - [Heroku](https://ies-controller.herokuapp.com/)

**Nota**: A API não pode ser acedida no / uma vez que não tem um caminho definido para o mesmo, de qualquer modo, pode ser consultada a parte da [documentação](https://iesapi.herokuapp.com/swagger-ui.html#/)

## Links

### Backlog
Para o backlog optamos pelo Pivotal Tracker o mesmo pode ser acedido <a href="https://www.pivotaltracker.com/n/projects/2410465">aqui</a>.

### Documentos
Os documentos do projeto podem ser encontrados na pasta da Google Drive, contém sempre a versão mais atualizada dos mesmos uma vez que a ferramenta definida para a escrita de relatórios foi o Google Docs, a pasta encontra-se <a href="https://drive.google.com/drive/folders/1Q3gWHAxaBDn8KbCLEB_KCepWUc4GiT_G?usp=sharing">aqui</a>.

## Frontend
Este repositório tem integração CI/CD. A parte de CI é tratada pelo Github Actions e a parte de CD é tratada pelo Heroku, podendo ser a aplicação web encontrada <a href="https://iesfrontend.herokuapp.com/login" target='_blank'>aqui</a>.

### Deploy do protótipo
O deploy do protótipo pode ser encontrado <a href='deti-engsoft-02.ua.pt:5000'>aqui</a>.<br>
**Nota:** É necessário estar conectado na rede da UA (ou VPN) para aceder ao mesmo.

### Especificação do frontend
Tal como mencionado anteriormente, o react encontra-se deployed no Heroku.
Não existe qualquer tipo de informação que possa ser acedida sem login.

#### Login
O login foi acente em JWT, JSON Web Token. O JWT é emitido pela API Spring e armazenado em localstorage. 
A proteção das rotas foi feita com Redux.
Uma das contas existentes é:
* **Email** - `ruicoelho@ua.pt`
* **Password** - `test`
<img src="presentation/Login.png">

#### Home
Assim que o login é feito com sucesso somos redirecionados para a homepage onde nos são apresentados 4 gráficos:
* **Temperatura** - Onde podemos ver os dados de temperatura do dia. É de salientar que os eixos são ajustados de forma automática dependendo estes dos valores que são fornecidos pela API.
* **CO2** - Onde podemos ver os dados de CO2 do dia. É de salientar que os eixos são ajustados de forma automática dependendo estes dos valores que são fornecidos pela API.
* **Acessos** - Onde podemos ver o número de acessos das pessoas no dia. É de salientar que os eixos são ajustados de forma automática dependendo estes dos valores que são fornecidos pela API.
* **Humidade** - Onde podemos ver os dados de humidade do dia. É de salientar que os eixos são ajustados de forma automática dependendo estes dos valores que são fornecidos pela API.
<img src="presentation/Home.png">

#### Análise de acessos
Nesta tab podemos ver os acessos autorizados que foram feitos. É de notar que a pesquisa nas tabelas está funcional, a mesma depende do json inicial que é retornado pela API.
<img src="presentation/Acessos.png">

#### Gestão de acessos
Esta tab permite tudo aquilo que é relacionado com a gestão de acessos, isto é, editar o nome das pessoas, remover acessos e adicionar acessos.

##### Adicionar Acessos
Carregando no botão de + temos a possibilidade de adicionar o último acesso não autorizado que foi realizado, isto é, a API retorna o ID do último acesso não autorizado e, adicionando o nome da pessoa a que ele corresponde, podemos guardar o mesmo.
<img src="presentation/AddAcesso.png">

##### Editar acesso
Carregando em qualquer um dos botões de editar é nos aberto um modal do qual temos a opção de editar o nome da pessoa com o acesso, essa é a única informação que o utilizador tem permissão para efetuar.
<img src="presentation/EditAcessos.png">

##### Remover acesso
Carregando em qualquer um dos botões de remover é nos aberto um modal para evitar que os 'missclicks', assim, sempre que tentamos apagar alguém da base de dados, somos obrigados a confirmar que essa é mesmo a ação que queremos tomar.
<img src="presentation/DeleteAcesso.png">

#### Análise de CO2
Nesta tab podemos ver a média dos últimos 7 dias dos valores de CO2. Esta agregação é retornada pela API.
<img src="presentation/CO2.png">

#### Análise de Temperatura
Nesta tab podemos ver a média dos últimos 7 dias dos valores de Temperatura. Esta agregação é retornada pela API.
<img src="presentation/Temperatura.png">

#### Análise de Humidade
Nesta tab podemos ver a média dos últimos 7 dias dos valores de Humidade. Esta agregação é retornada pela API.
<img src="presentation/Humidade.png">

#### PWA
Uma vez que não implementamos uma APP Android apesar de termos começado a mesma, esta app abriria a porta, como não ficou 100% funcional, decidimos não entregar a mesma.
<img src="presentation/PWA_Install.png">
Assim, fizemos uma PWA otimizada para telemóveis.
Salientamos:
* Design responsivo
* Menu funciona com swipe right para abrir
* Menu funciona com tap para fechar
<img src="presentation/pwa.png">

#### White Theme
Quando desenvolvemos esta dashboard pensamos em todo o tipo de utilizadores, por isso, decidimos implementar a dashboard com um night theme que é o aberto por default, contudo, o utilizador se preferir pode escolher o light theme. Estas definições são guardadas e, quando o utilizador abre novamente o website, elas são carregadas.
<img src="presentation/White.png">
