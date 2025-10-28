# 🚀 Projeto - Guia de Desenvolvimento

Bem-vindo ao projeto! Este guia irá ajudá-lo a configurar e executar o ambiente de desenvolvimento rapidamente.

## 📋 Pré-requisitos

- Docker instalado na máquina
- Docker Compose disponível

## 🛠 Configuração do Ambiente

### 1. 🐳 Subir todos os serviços

```bash
docker-compose up -d
```

Este comando irá iniciar todos os containers em background.

### 2. 📊 Executar migrações do banco de dados (execute apenas uma vez)

```bash
docker-compose run --rm app npx prisma migrate dev
```

**Importante:** Este comando deve ser executado apenas uma vez após a primeira inicialização dos containers.

## 🌐 Acessos aos serviços

Após executar os comandos acima, os seguintes serviços estarão disponíveis:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Aplicação Principal** | http://localhost:3000 | App principal do projeto |
| **Prisma Studio** | http://localhost:5555 | Interface para gerenciamento do banco de dados |
| **pgAdmin** | http://localhost:8045 | Administração do PostgreSQL |
| **PostgreSQL** | localhost:15432 | Banco de dados PostgreSQL |

## 🔧 Comandos úteis

### Parar os serviços
```bash
docker-compose down
```

### Ver logs dos serviços
```bash
docker-compose logs -f
```

### Reiniciar serviços específicos
```bash
docker-compose restart [serviço]
```

## 📝 Notas importantes

- Certifique-se de que as portas 3000, 5555, 8045 e 15432 estejam livres na sua máquina
- As migrações devem ser executadas apenas na primeira vez ou quando houver novas migrações
- Em caso de problemas, verifique os logs com `docker-compose logs`

## 🆘 Troubleshooting

Se encontrar problemas:

1. Verifique se todos os containers estão rodando: `docker-compose ps`
2. Confirme se as portas não estão sendo usadas por outros serviços
3. Execute `docker-compose down` e depois `docker-compose up -d` para reiniciar

---

**Happy coding!** 🎉