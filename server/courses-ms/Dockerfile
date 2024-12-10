FROM node:20

WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install 

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto
EXPOSE 3004

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
