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



## Orientações a se atentar:
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
- Nas rotas 'POST' retornar o objeto criado em formato json

```
router.post('/', createUserSchema, async (req: Request<{}, {}, User>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array() })
        return;
    }

    const { name , email, passwordHash } = req.body;
    const newUser:User = {
        id: mockUsers.length + 1,
        name, 
        email, 
        passwordHash, 
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    mockUsers.push(newUser);
    res.status(HttpStatusCodes.CREATED).json(newUser);
})
```

# NÃO SE ESQUECER, DE JEITO NENHUM:
- Após finalizar as rotas de 'task', 'users' e 'tags', integrar todas, lembrando de:
    - Ao excluir um usuário, excluir as tasks a ela associadas
    - Ao excluir uma task, excluir as tags a ela associadas. 
    





