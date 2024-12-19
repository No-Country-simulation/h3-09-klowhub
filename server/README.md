
---

# Estructura del Back

La arquitectura del back está formada por microservicios independientes. Cada microservicio debe instalarse y ejecutarse por separado.

```plaintext
server/
│-- klowhub-gateway/    # Gateway API
│-- apps-ms/            # Microservicio 1
│-- courses-ms/         # Microservicio 2
│-- orders-ms/          # Microservicio 3
│-- payments-ms/        # Microservicio 4
│-- users-ms/           # Microservicio 5
```

---

## 🛠 Instalación y Ejecución del Back

### **Requisitos Previos**

- **Node.js** (>= 18.x)
- **NPM** o **Yarn** como gestor de paquetes
- Archivo **.env** configurado en la raíz de cada microservicio

---

## ⚙️ Configuración de Variables de Entorno

Debes crear un archivo `.env` en la raíz de cada microservicio. A continuación se muestra la configuración básica para cada uno:

### **klowhub-gateway**

```plaintext
PORT=3000
HOST=localhost
USERS_MICROSERVICE_HOST=localhost
USERS_MICROSERVICE_PORT=3001
APPS_MICROSERVICE_HOST=localhost
APPS_MICROSERVICE_PORT=3002
COURSES_MICROSERVICE_HOST=localhost
COURSES_MICROSERVICE_PORT=3004
ORDERS_MICROSERVICE_HOST=localhost
ORDERS_MICROSERVICE_PORT=3005
PAYMENTS_MICROSERVICE_HOST=localhost
PAYMENTS_MICROSERVICE_PORT=3006
```

### **users-ms**

```plaintext
USER_PORT=3001
USER_HOST=localhost    
JWT_SECRET=key JWT
DATABASE_URL_USER= Link a una base de datos deployada
```
### **apps-ms**

```plaintext
APP_PORT=3002
APP_HOST= localhost
GCP_PROJECT_ID= id de google
BUCKETNAME= nombre del bucket de google storage
DATABASE_URL= Link a una base de datos deployada
```

### **courses-ms**

```plaintext
COURSES_HOST=localhost
COURSES_PORT=3004
DATABASE_URL_COURSES=Link a una base de datos deployada
```

### **orders-ms**

```plaintext
ORDER_PORT=3005
ORDER_HOST=localhost
DATABASE_URL_ORDERS=Link a una base de datos deployada
```

### **payments-ms**

```plaintext
PAYMENTS_PORT=3006
PAYMENTS_HOST=localhost
STRIPE_SECRET_KEY=secreto de stripe
STRIPE_SUCCESS_URL=
STRIPE_CANCEL_URL=
STRIPE_ENDPOINT_SECRET=
```

---

## 📥 Instalación

En cada carpeta del microservicio, ejecuta los siguientes comandos:

1. Instala las dependencias:

```bash
npm install
```

2. Si el microservicio tiene base de datos configurada con Prisma:

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Ejecución

### **Modo Desarrollo**

En la raíz de cada microservicio, ejecuta:

```bash
npm run start:dev
```

---

## 📂 Microservicios y Puertos

| Microservicio          | Puerto  |
|------------------------|---------|
| **Gateway API**        | 3000    |
| **Users**              | 3001    |
| **Apps**               | 3002    |
| **Courses**            | 3004    |
| **Orders**             | 3005    |
| **Payments**           | 3006    |

---

## 🔗 Conexiones a la Base de Datos

Cada microservicio que utilice una base de datos debe configurar el enlace en su respectivo archivo `.env` como se mostró en las secciones anteriores. Los link de las bases deployadas se pasaran por separado

---

Si necesitas ayuda adicional para la configuración de algún microservicio o tienes problemas con la ejecución, no dudes en consultar el equipo. 🚀