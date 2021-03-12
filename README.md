# Resolução do teste para a empresa Ewally.
---
CRUD do recurso de boleto. As validações para checar se o código de barras do boleto (tanto de convênio quanto de título) foram feitas sem o uso de bibliotecas externas. 

## Instalação / Execução
Para uso local:
```sh
npm install
npm run dev
```

Para uso da versão de produção:
```sh
npm install
npm run build
npm prune --production
npm start
```
Execução dos testes:
```sh
npm install
npm test
```

### Comentários sobre o teste
Pessoal vou usar esse espaço para fazer breves comentários sobre a aplicação:

- Eu juro que tentei (rsrsrs) fazer um mock para a aplicação. Cadastrando linhas digitáveis e código de barras válido. Eu apanhei muito nos campos livres. Eu entendi que cada instituição financeira tem algumas particularidades e isso acabou me ferrando. Mas, de qualquer forma, mantive o código da minha tentativa. Vocês podem checar no caminho:  src/infrastructure/mock

- Apesar de não estar sendo solicitado fazer o CRUD, apenas a rota de GET, acho que faria mais sentido ter o CRUD completo, para poder realizar os testes, tanto automatizados quanto os testes manuais.

- Eu 💟 typescript

- Eu 💟 testes

- Eu não gosto tanto de express 💔. Só que pela proposta, considerei ser o framework mais simples e fácil. Não gosto tanto de express pelo fato de ter algumas limitações, ser bem simples.

- Eu poderia ter adicionado muito mais funcionalidades, como, por exemplo, o próprio mock, poderia a partir da linha digitável deduzir o código de barras ou vice-versa. Porém, optei por fazer o código mais simples e rápido, totalmente focado em ser funcional.

- Essa foi a primeira vez que trabalhei com o lowdb. Pensei em utilizar o sqllite, mas, queria ser mais simples ainda. Então, vi a possibilidade de usar esse banco.

Por fim, espero que gostem do meu teste, desde já quero agradecer pela oportunidade e até logo. Estou disponível para quaisquer dúvidas.

