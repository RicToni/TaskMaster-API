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

## Orientações a se atentas:
- Sempre retornar um 'json' nas responses, ainda que seja um erro. 
- Seguir os padrões de erro em todas as responses. 
- Tipar as requests
- Usar os "enum's" para status das responses. 

Exemplo: 
```
router.get('/', async(req: Request, res: Response): Promise <void> => {
    if (mockTasks.length === 0) {
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'NENHUMA TAREFA CADASTRADA'});
        return ;
    }
    res.status(HttpStatusCodes.OK).json(mockTasks);
})
```




