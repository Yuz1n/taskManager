
# **Task Management Application**

## **Índice**

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Documentação da API](#documentação-da-api)
- [Testes Unitários](#testes-unitários)
- [Melhorias Futuras](#melhorias-futuras)

## **Visão Geral**

Esta aplicação é um gerenciador de tarefas simples desenvolvido usando Angular no frontend e Node.js no backend. Ele permite criar, ler, atualizar e excluir tarefas (CRUD) de maneira eficiente. A API foi documentada utilizando o Swagger, e a aplicação foi rigorosamente testada com testes unitários.

## **Funcionalidades**

- **Adicionar Tarefa:** Permite ao usuário criar novas tarefas com título, descrição, data de vencimento, e status de conclusão.
- **Visualizar Tarefas:** Exibe todas as tarefas criadas, destacando aquelas que foram completadas.
- **Editar Tarefa:** Permite ao usuário atualizar os detalhes de uma tarefa existente.
- **Excluir Tarefa:** Permite ao usuário remover uma tarefa do sistema.
- **Interface Responsiva:** A interface é totalmente responsiva, garantindo uma boa experiência tanto em desktop quanto em dispositivos móveis.
- **Documentação Swagger:** A API está completamente documentada usando o Swagger, fornecendo uma interface interativa para os endpoints da API.
- **Testes Unitários:** Implementação de testes unitários para garantir que cada funcionalidade do sistema esteja funcionando conforme o esperado.

## **Requisitos**

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)
- Angular CLI (versão 12 ou superior)

## **Instalação**

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/project-management.git
   cd project-management
   ```

2. **Instale as dependências do backend:**

   ```bash
   cd server
   npm install
   ```

3. **Inicie o servidor backend:**

   ```bash
   cd ../server
   node index.js
   ```

   O servidor estará rodando em `http://localhost:3000`.

4. **Inicie o frontend Angular:**

   ```bash
   cd ../client
   ng serve
   ```

   A aplicação estará disponível em `http://localhost:4200`.

## **Como Usar**

### **Adicionando uma Tarefa:**

- Preencha os campos de título, descrição, data de vencimento e marque como completa (se aplicável).
- Clique em "Add Task" para adicionar a tarefa.

### **Visualizando Tarefas:**

- As tarefas adicionadas são listadas na interface principal.
- Tarefas completadas serão destacadas com um fundo diferenciado.

### **Editando uma Tarefa:**

- Clique em "Edit" ao lado de uma tarefa para abrir o modal de edição.
- Atualize as informações necessárias e clique em "Save Changes".

### **Excluindo uma Tarefa:**

- Clique em "Delete" ao lado de uma tarefa para removê-la permanentemente.

## **Endpoints da API**

### **GET /tasks**

- **Descrição:** Recupera todas as tarefas.
- **Resposta:** 
  - **200 OK**: Retorna uma lista de tarefas.

### **POST /tasks**

- **Descrição:** Cria uma nova tarefa.
- **Corpo da Requisição:**
  ```json
  {
    "title": "New Task",
    "description": "Description for the new task",
    "dueDate": "2024-05-23",
    "completed": false
  }
  ```
- **Resposta:** 
  - **201 Created**: Retorna a tarefa recém-criada.

### **PUT /tasks/:id**

- **Descrição:** Atualiza uma tarefa existente.
- **Parâmetros:** 
  - **:id** (string): O ID da tarefa a ser atualizada.
- **Corpo da Requisição:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "dueDate": "2024-05-24",
    "completed": true
  }
  ```
- **Resposta:** 
  - **200 OK**: Retorna a tarefa atualizada.

### **DELETE /tasks/:id**

- **Descrição:** Exclui uma tarefa.
- **Parâmetros:** 
  - **:id** (string): O ID da tarefa a ser excluída.
- **Resposta:** 
  - **204 No Content**: A tarefa foi excluída com sucesso.

## **Documentação da API**

A documentação completa da API está disponível no Swagger. Para acessar a interface interativa, navegue até:

```
http://localhost:3000/api-docs
```

Aqui você pode explorar todos os endpoints, visualizar os esquemas de dados e testar as operações diretamente na interface.

## **Testes Unitários**

Os testes unitários foram implementados para garantir que todas as funcionalidades críticas do sistema estejam funcionando conforme o esperado.

### **Como Executar os Testes Unitários:**

1. Execute os testes:

   ```bash
   ng test
   ```

   Os testes irão rodar no navegador, e você verá os resultados diretamente na interface do Karma.

### **Cobertura dos Testes:**

- **TaskService:** Testes para garantir que as operações de CRUD estejam funcionando corretamente, incluindo os métodos `getTasks`, `addTask`, `updateTask`, e `deleteTask`.
- **Componentes:** Testes para verificar se os componentes estão sendo criados corretamente e se a lógica de exibição e interação com o usuário está funcionando como esperado.
  - **TaskFormComponent:** Testes para garantir que o formulário de criação e edição de tarefas funcione corretamente.
  - **TaskItemComponent:** Testes para verificar a exibição correta de tarefas, especialmente a aplicação de classes CSS com base no status de conclusão.
  - **TaskListComponent:** Testes para verificar a listagem, edição, e exclusão de tarefas.

## **Conclusão**

Este `README.md` foi criado para oferecer uma visão abrangente do projeto, cobrindo desde as funcionalidades básicas até os detalhes mais técnicos da API e dos testes unitários. Esta documentação deve ajudar qualquer desenvolvedor a configurar, entender e contribuir com o projeto.

Se precisar de mais alguma coisa ou ajustes na documentação, estou aqui para ajudar!
