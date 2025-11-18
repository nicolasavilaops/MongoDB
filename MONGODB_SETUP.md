# Mongodb atlas configuration

## Conexão e credenciais

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/avilaops?retryWrites=true&w=majority
MONGODB_DB=avilaops
```

## Instruções de setup

### 1. Criar cluster no mongodb atlas
- Acesse [mongodb atlas](https://www.mongodb.com/cloud/atlas)
- Crie uma organização "avilaops"
- Crie um cluster (recomendado: m0 para dev, m2+ para prod)
- Configure network access (ip whitelist)

### 2. Criar usuário
```bash
# No console do mongodb atlas
- Database access > Add new database user
- Username: avilaops-admin
- Password: [gerado automaticamente]
- Built-in role: Atlas admin
```

### 3. Obter connection string
```
Connection string > Connect your application
Driver: Node.js
Version: 4.x ou superior
```

### 4. Variáveis de ambiente
```bash
# .env local
MONGODB_URI=seu_connection_string_aqui
MONGODB_DB=avilaops
NODE_ENV=development
```

### 5. Collections recomendadas

```javascript
// Users
{
  _id: ObjectId,
  email: String,
  name: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}

// Projects
{
  _id: ObjectId,
  name: String,
  description: String,
  owner: ObjectId,
  repository: String,
  createdAt: Date,
  updatedAt: Date
}

// Deployments
{
  _id: ObjectId,
  projectId: ObjectId,
  status: String,
  version: String,
  logs: String,
  createdAt: Date
}
```

## Índices recomendados

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });

// Projects collection
db.projects.createIndex({ owner: 1 });

// Deployments collection
db.deployments.createIndex({ projectId: 1, createdAt: -1 });
```

## Segurança

- ✅ Sempre use connection strings com autenticação
- ✅ Whitelist ips de produção no mongodb atlas
- ✅ Rotacione credenciais regularmente
- ✅ Use variáveis de ambiente (nunca commitar credenciais)
- ✅ Backups automáticos habilitados no plano m2+

## Documentação

- [Mongodb atlas docs](https://docs.atlas.mongodb.com/)
- [Node.js driver](https://docs.mongodb.com/drivers/node/)
- [Best practices](https://docs.mongodb.com/manual/administration/best-practices/)
