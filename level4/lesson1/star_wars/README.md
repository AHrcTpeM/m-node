База данных mysql  
Создать .env  
Пример:  

DB_USER=root  
DB_PASSWORD=root  
DB_DATABASE=db  
HOST=localhost  
PORT=3000  
JWT_SECRET=secretKey  
AWS_ACCESS_KEY_ID=AKIARAQ 
AWS_SECRET_KEY=MNDI0Q
AWS_REGION=eu-central-1  
AWS_BUCKET_NAME=bucket    

npm install
npm run seed - синхронизация включена, поэтому сразу создадуться таблицы в базе данных и начнут заполнятся данными из swapi.  
npm run start - заходим на http://localhost:3000/api, тестируем

миграции:  
отключаем synchronize: false в app.module.ts, все несовпадения схем в базе данных и entities будут фиксироваться в миграциях  
npm run migration:generate - создаем миграцию  
npm run migration:run - запускаем ВСЕ файлы миграции  
npm run migration:revert - делаем откат ОДНОЙ миграции  



## My Description
npm install --save @nestjs/typeorm typeorm mysql2
npm install --save @nestjs/swagger

## License

Nest is [MIT licensed](LICENSE).
