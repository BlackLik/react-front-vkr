# Используем образ Node.js в качестве базового образа
FROM node:14.17.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /frontend

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Собираем приложение React с помощью Vite
RUN npm run build

# Устанавливаем глобально serve для запуска статического контента
RUN npm install -g serve

# Устанавливаем переменную среды для указания порта, на котором будет работать приложение
ENV VITE_ENV=production
ENV VITE_API_BACKEND=http://0.0.0.0:5000

# Открываем указанный порт
EXPOSE 3000

# Запускаем сервер для обслуживания статического контента
CMD serve -s dist -l 3000
