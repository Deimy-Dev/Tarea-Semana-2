# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
