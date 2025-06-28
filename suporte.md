# 💡 API de Gerenciamento de Tarefas com Sistema de Etiquetas (Tags)

## 📌 Funcionalidades principais (CRUD)
- Usuários:
    - Cadastro. 
    - Login. 
    - Autenticação via token (JWT). 

- Tarefas: 
    - Criar. 
    - Listar. 
    - Atualizar. 
    - Excluir. 
    - Marcar como concluída. 
    - Vencimento. 
    - Prioridade:
        - Baixa. 
        - Média. 
        - Alta. 

- Tags. 

## 🔐 Autenticação:
- Apenas usuários logados podem ver/criar/editar suas tarefas.

- Middleware para proteger rotas. 

## 🔎 Filtros inteligentes (nível intermediário):
- Buscar tarefas por:
    - Status (pendende, concluída).
    - Data de vencimento. 
    - Tag. 
    - Prioridade. 

## 🚏 Endpoints:
```
POST   /api/register
POST   /api/login
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tags
POST   /api/tags
```

## Libs úteis:
- express-validator — validações
- dotenv — variáveis de ambiente




